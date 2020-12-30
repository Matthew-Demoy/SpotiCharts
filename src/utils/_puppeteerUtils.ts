import { Browser, Page } from "puppeteer";

const clickXPath = async (
  page: Page,
  path: string,
  waitPath?: string,
  delay?: number
) => {
  if (waitPath !== undefined) {
    await page.waitForXPath(waitPath);
  } else {
    await page.waitForXPath(path);
  }

  await page.waitForTimeout(delay ?? 0);

  await page
    .$x(path.trim())
    .then((res) => {
      res[0].evaluate((form: any) => form.click());
    });
};

const typeXPath = async (
  page: Page,
  path: string,
  content: string,
  waitPath?: string,
  delay?: number
) => {
  if (waitPath !== undefined) {
    await page.waitForXPath(waitPath);
  } else {
    await page.waitForXPath(path);
  }

  await page.waitForTimeout(delay ?? 0);
  const res = await page.$x(path.trim());
  await res[0].type(content);
};

const getCurrentPage = async (browser: Browser) => {
  const pages = await browser.pages();
  let page;
  for (let i = 0; i < pages.length && !page; i++) {
    const isHidden = await pages[i].evaluate(() => document.hidden);
    if (!isHidden) {
      page = pages[i];
    }
  }

  if(page === undefined)
  {
    page = await browser.newPage();
    return page
  }
  return page;
};

const waitandRefreshForElement = async (page: Page, path: string, stoppingCondition ?: string, iterations?: number, delay?: number) : Promise<boolean> => {
  
  let res = await page.$x(path)
  
  const refreshCount = 0;
  while(refreshCount < (iterations ?? 100))
  {
    if(stoppingCondition?.length)
    {
      let stopIfEmpty = await page.$x(stoppingCondition ?? '')
      if(stopIfEmpty.length === 0)
      {
        return false
      }
      
    }
    if(res.length > 0)
    {
      return true
    }
    await page.waitForTimeout(delay ?? 3000)
    await page.reload()
    res = await page.$x(path)
  }
  return false
}






const waitTillHTMLRendered = async (page: Page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while(checkCounts++ <= maxChecks){
    let html = await page.content();
    let currentHTMLSize = html.length; 

    let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

    console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

    if(lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) 
      countStableSizeIterations++;
    else 
      countStableSizeIterations = 0; //reset the counter

    if(countStableSizeIterations >= minStableSizeIterations) {
      console.log("Page rendered fully..");
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitFor(checkDurationMsecs);
  }  
};

export {getCurrentPage, clickXPath, typeXPath,waitTillHTMLRendered, waitandRefreshForElement}