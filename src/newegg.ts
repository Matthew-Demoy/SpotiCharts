import { Browser } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import moment from 'moment'
import { Task } from "./task";

puppeteer.use(StealthPlugin());

const timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');

export const task = async (browser: Browser, url: string, keywords: string[]) => {
  
    const result = await runSubtasks(url, keywords, browser);
  
};

const runSubtasks = async (
  url: string,
  keywords: string[],
  browser: Browser
) => {
  const page = await browser.newPage();
  await page.goto(url)
  
  await page.setViewport({ width: 800, height: 600 });
  await page.goto(url);

  page.waitForSelector("#ProductBuy");

  
  const buyButton = await page.$x("//*[@id=\"ProductBuy\"]/div/div[2]/button").then(res => res[0]);
  await page.waitForTimeout(1000)
  await buyButton.evaluate((form: any) => form.click());

  const hasWarranty = await page.$x(`//*[@id="modal-intermediary"]/div/div/div/div[1]/div/div[2]/div/img`)
  if (hasWarranty.length > 0) {
    await page
      .$x('//*[@id="modal-intermediary"]/div/div/div/div[3]/button[1]')
      .then((res) => res[0].evaluate((form: any) => form.click()));
  }
  await page.waitForTimeout(1000)
  await page.waitForXPath(
    '//*[@id="modal-intermediary"]/div/div/div[1]/div/div/div/div[2]/div'
  );
  await page.waitForTimeout(1000)
  await page
    .$x('//*[@id="modal-intermediary"]/div/div/div[2]/div[2]/button[2]')
    .then((res) => res[0].evaluate((form: any) => form.click()));
    await page.waitForTimeout(1000)
  await page.screenshot({
    path: "/screenshots/" + timeStamp + ".png",
    fullPage: true,
  });
};








