const FIVE_MINUTES = 5 * 60 * 1_000;
const TEN_MINUTES = 10 * 60 * 1_000;

class SelectorHelper {

  constructor(page) {
    this.page = page;
  }

  async findElementByFullXPath(fullXPath) {

    if (!this.page) throw new Error("No page setted on this helper"); 

    const matchedElements = await this.page.$x(fullXPath);

    if (matchedElements.length === 0) throw new Error(`Error fullXPath matched no element. XPath: ${fullXPath}`);

    return matchedElements[0];
  }

}

async function waitUntilLobbyCloses (_s) {
  await _s.page.waitForXPath("/html/body/div[1]/div/div[2]/form/div[3]/input", { timeout: TEN_MINUTES });
}

async function playTriviaDummyBehaviorFlow (_s) {

  // When waits for question to answer to appear.
  await _s.page.waitForXPath("/html/body/div[1]/div/div[2]/div[1]/div[2]", { timeout: FIVE_MINUTES });

  const questionStepFullXPath = "/html/body/div[1]/div/div[2]/div[1]/div[1]/div[2]";

  await _s.page.waitForXPath(questionStepFullXPath, { timeout: FIVE_MINUTES });

  const questionStepDivEl = await _s.findElementByFullXPath(questionStepFullXPath);
  console.log(`===> JSON.stringify questionStepDivEl ${JSON.stringify(questionStepDivEl)}\n`);
  console.log(`===> questionStepDivEl ${questionStepDivEl}\n`);
  console.log(`===> questionStepDivEl innerHTML ${questionStepDivEl.innerHTML}\n`);

  // When waits for the scoreboard to appear.
  await _s.page.waitForXPath("/html/body/div[1]/div[2]/div/div/div[1]", { timeout: FIVE_MINUTES });

  playTriviaDummyBehaviorFlow(_s);
};

module.exports = {
  SelectorHelper,
  waitUntilLobbyCloses,
  playTriviaDummyBehaviorFlow,
  FIVE_MINUTES,
  TEN_MINUTES,
};
