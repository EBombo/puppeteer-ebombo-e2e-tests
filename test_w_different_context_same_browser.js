const puppeteer = require('puppeteer');

const timeoutPromise = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });


  const URL = "http://localhost:3001";

  const pages = [];

  for(let i = 0; i < 50; i++) {
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(URL);

    if (i < 5) {
      await page.evaluate((i) => {
        const localData = {a: `user-${i}`};
        localStorage.setItem("data", JSON.stringify(localData));
      }, i);
    }

    await timeoutPromise(1000);

    pages.push(page);
  }

  for(let i = 0; i < 50; i++) {
    const result = await pages[i].evaluate(() => {
      return localStorage.getItem("data");
    });

    console.log(`>>> page ${i} result:`, JSON.stringify(result), `\n`);
  }
  // const otherPage = await browser.newPage();
  // await otherPage.goto(URL);

})()
// Comment/Uncomment the line below to keep/terminate process.
  .then(process.exit);
