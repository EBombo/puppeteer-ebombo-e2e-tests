const puppeteer = require('puppeteer');

const timeoutPromise = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  const URL = "http://localhost:3001";
  const page = await browser.newPage();

  await page.goto(URL);


  await page.evaluate(() => {
    const localData = {a: 1000};
    localStorage.setItem("data", JSON.stringify(localData));
  });

  await timeoutPromise(3000);

  const otherPage = await browser.newPage();

  await otherPage.goto(URL);

  const result = await otherPage.evaluate(() => {
    return localStorage.getItem("data");
  });

  console.log("otherpage result:", JSON.stringify(result));


})()
// Comment/Uncomment the line below to keep/terminate process.
  .then(process.exit);
