import { Browser, Page } from "puppeteer";

export const getChartsFromPage = async (page: Page) => {
  const chartList = await page.$$eval(".bucket-item", (e) =>
    e.map((e) => {
      const isArtist = e.querySelectorAll(".chart-artists").length;
      const chartUrl = e.querySelector(".chart-url")?.getAttribute("href");

      return {
        isArtist: isArtist > 0,
        chartUrl,
      };
    })
  );

  return chartList.filter((chart) => {
    return chart.isArtist;
  });
};

export const getTracksFromTop100 = async (browser: Browser, url: string) => {
  const page = await browser.newPage();

  await page.goto(url);

  const trackList = await page.$$eval(
    ".bucket-item.ec-item.track",
    (elements) => {
      const list = elements.map((e) => {
        return {
          track: e.getAttribute("data-ec-name") || '',
          artist: e.getAttribute("data-ec-d1")  || '' ,
          href: e.querySelector('a')?.href || ''
        };
      });

      return list;
    }
  );
  page.close();
  return trackList;
};
