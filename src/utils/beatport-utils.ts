import { Page } from "puppeteer";

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

  return chartList.filter(chart => {
      return chart.isArtist
  })
};
