const puppeteer = require('puppeteer');
const {faker} = require('@faker-js/faker');
const {enterLobbyFlow} = require("./ebombo.io/loginLobby");

const localUrl = "http://localhost:3001"
const developmentUrl = "https://red.ebombo.io"
const productionUrl = "https://ebombo.io"

const URL = localUrl;
const PIN_CODE = "660467";
const NICKNAME = faker.internet.email();

// Main function.
(async () => {
    // Lunch browser.
    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});

    const page = await browser.newPage();

    // Load page.
    await page.goto(URL, {waitUntil: "networkidle2"});
    console.log("Page loaded");

    // Login to lobby.
    const user = await enterLobbyFlow(page, PIN_CODE, NICKNAME);

    console.log("user", user)

    // TODO: Use the value of the *user.lobby* to define the game env.
    /** Bingo, Roulette, Trivia **/

    // TODO: Pay game.
    // TODO: await playerAnsweringQuestionsFlow(page);
    // await waitUntilLobbyCloses(_s);


    // PlayTriviaDummyBehaviorFlow is a flow where users does not answer in a trivia game.
    // await playTriviaDummyBehaviorFlow(_s);

    console.log("End of flow.");
    //await page.close();
    await browser.close();
})();


// References:
// https://github.com/puppeteer/puppeteer/blob/v14.4.1/docs/api.md [documentation]

// https://stackoverflow.com/questions/57602530/puppeteer-load-testing-using-puppeteer
// https://github.com/thomasdondorf/puppeteer-cluster
// https://stackoverflow.com/questions/51971760/managing-puppeteer-for-memory-and-performance
// https://github.com/puppeteer/puppeteer/issues/85
// https://github.com/cyrus-and/chrome-remote-interface/issues/118
