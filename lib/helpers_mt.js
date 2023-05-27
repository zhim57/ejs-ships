require("dotenv").config();
const puppeteer = require("puppeteer");

module.exports = {
  lookUpVessel: async function (term, cb) {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        slowMo: 0,
        devtools: false,
      });
      const page = await browser.newPage();
      await page.goto("https://www.marinetraffic.com/");
      await page.waitForTimeout(300);

      await page.bringToFront();

      await page.waitForSelector(".MuiInputBase-input");

      await page.click(".MuiInputBase-input", { delay: 60 });
      await page.waitForSelector("#searchMT");
      await page.type("#searchMT", term);

      await page.waitForTimeout(200);
      await page.waitForSelector(".font-bold");
      await cb("go");
      await page.waitForTimeout(1000);
      await browser.close();
    } catch (error) {
      throw new Error("logging in to global was not successful !");
    }
  },
};
