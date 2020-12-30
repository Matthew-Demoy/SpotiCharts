/// <reference path="../ninja.d.ts" />

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import dotenv from "dotenv";

puppeteer.use(StealthPlugin());
dotenv.config();

puppeteer
  .launch({
    headless: false
  })
  .then(async (browser) => {
    const page = await browser.newPage();
    page.waitForTimeout(999999);
  });
