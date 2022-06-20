const puppeteer = require('puppeteer');
const { faker } = require('@faker-js/faker');
const { SelectorHelper } = require('./utils');
const { playerAnsweringQuestionsFlow } = require('./trivia/activePlayerFlow');

const URL = "http://localhost:3001";
const PIN_CODE = "269600";
const NICKNAME = faker.internet.email();

const FIVE_MINUTES = 5 * 60 * 1_000;
const TEN_MINUTES = 10 * 60 * 1_000;

const timeoutPromise = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function enterLobbyFlow (_s, url) {

  await _s.page.goto(url);

  const inputPIN =  await _s.findElementByFullXPath("/html/body/div[1]/div/div[2]/form/div[3]/input");
  await inputPIN.type(PIN_CODE);

  const buttonSubmitPIN =  await _s.findElementByFullXPath("/html/body/div[1]/div/div[2]/form/div[3]/button");
  await buttonSubmitPIN.click();

  await timeoutPromise(2_000);

  const usernameInput =  await _s.findElementByFullXPath("/html/body/div[1]/div/div[2]/form/div[2]/input");
  await usernameInput.type(NICKNAME);

  const buttonSubmitNickname =  await _s.findElementByFullXPath("/html/body/div[1]/div/div[2]/form/div[2]/button");
  await buttonSubmitNickname?.click();

  try {
    // Waits for userlayout lobby's title selector as indicator user is in lobby.
    await _s.page.waitForXPath("/html/body/div[1]/div[1]/div[2]", { timeout: FIVE_MINUTES });

    const userId = await _s.page.evaluate(() => {
      const userStringified = localStorage.getItem("user");
      const user = JSON.parse(userStringified);

      return user.id;
    });

    console.log(`=> userId ${userId} got into lobby.`);
  } catch(e) {
    throw new Error(`Probably user could not get into lobby.\n${e}`);
  }

  // await _s.page.screenshot({ path: `first_time_inside_lobby_${userId}.png` });
};

// Main function.
(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  const page = await browser.newPage();
  const _s = new SelectorHelper(page);

  await enterLobbyFlow(_s, URL);
  //
  await playerAnsweringQuestionsFlow(_s);
  // await waitUntilLobbyCloses(_s);

  console.log("End of flow.");

  // PlayTriviaDummyBehaviorFlow is a flow where users does not answer in a trivia game.
  // await playTriviaDummyBehaviorFlow(_s);

  await page.close();
  await browser.close();
})()
// Comment/Uncomment the line below to keep/terminate process.
  .then(process.exit);


// References.
// https://stackoverflow.com/questions/57602530/puppeteer-load-testing-using-puppeteer
// https://github.com/thomasdondorf/puppeteer-cluster
// https://stackoverflow.com/questions/51971760/managing-puppeteer-for-memory-and-performance
// https://github.com/puppeteer/puppeteer/issues/85
// https://github.com/cyrus-and/chrome-remote-interface/issues/118
