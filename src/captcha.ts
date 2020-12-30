import { Browser } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const username = process.env.GMAIL_USERNAME;
const password = process.env.GMAIL_PASSWORD;
puppeteer.use(StealthPlugin());

const url =
  "https://accounts.google.com/signin/v2/identifier?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620&flowName=GlifWebSignIn&flowEntry=ServiceLogin";

export const loginYoutube = async (browser: Browser) => {
  if (password === undefined || username === undefined) {
    console.log("ERROR : Username or password undefined");
    return;
  }
  
    const page = await browser.newPage();
    page.goto(url);
    await page.waitForXPath(`//*[@id="view_container"]/div/div/div[2]`);

    let res = await page.$x(`//*[@id="identifierId"]`)
    await res[0].type(username)

    await page
      .$x(`//*[@id="identifierNext"]/div/button/div[2]`)
      .then((elements: any[]) => {
        const el = elements[0];
        el.click();
      });


    await page.waitForXPath(`//*[@id="password"]/div[1]/div/div[1]/input`);
    await page.waitForTimeout(1000);
    res = await page.$x(`//*[@id="password"]/div[1]/div/div[1]/input`)
    await res[0].type(password)

    await page
      .$x(`//*[@id="passwordNext"]/div/button`)
      .then((elelemnts: any[]) => {
        const el = elelemnts[0];
        el.click();
      });

    await page.waitForXPath(`//*[@id="logo-icon-container"]`);

    return;
  
};
