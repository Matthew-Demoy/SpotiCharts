import { Browser, Page } from "puppeteer";
import {
  addTracksToPlaylist,
  createPlaylist,
  getPlaylists,
} from "../core/spotify/playlist-api";
import { getChartsFromPage } from "../utils/beatport-utils";
import { getSpotifyJSONForTrackList } from "../utils/spotify-utils";

interface ChartData {
  title: string;
  cover: any;
  tracks: { title: string; artist: string }[];
}
export const createPlaylistFromCharts = async (
  browser: Browser,
  access_token: string,
  user_id: string
) => {
  const page = await browser.newPage();

  await page.goto(`https://www.beatport.com/charts/all?page=2&genres=12%2C5%2C6%2C1`);

  const chartJSONArr = await getChartsFromPage(page);

  for (var chart of chartJSONArr) {
    if (!chart.isArtist) {
      return;
    }
    try {
      const page = await browser.newPage();
      const chartData = await getChartData(page, chart);
      console.log("adding chart data " + chartData);
      //check if playlist exists for chart
      const recentPlaylists = await getPlaylists(access_token, 50);
      console.log("received playlist " + recentPlaylists);
      const exists = recentPlaylists.items.some(
        (playlist: SpotifyApi.TrackObjectSimplified) => {
          return playlist.name === chartData.title;
        }
      );
      if (exists) {
        console.log("duplicate playlist found for chart - not adding");
        continue;
      }
      //get spotify uris of tracks
      const tracksAsSpotifyJSON = await getSpotifyJSONForTrackList(
        access_token,
        chartData.tracks
      );
      console.log(
        "recieved tracks as spotify json -" +
          tracksAsSpotifyJSON.length +
          " tracks found"
      );

      //add tracks
      const spotifyURIs = tracksAsSpotifyJSON
        .filter((e) => {
          return e !== undefined;
        })
        .map((track) => {
          return track.uri;
        });

      //create playlist
      const playlist = await createPlaylist(access_token, chartData.title);
      console.log("playlist created " + playlist.name);

      console.log("adding tracks to playlist");
      const playlistSnapshot = addTracksToPlaylist(
        access_token,
        playlist.id,
        spotifyURIs
      );

      //add cover
      page.close()
    } catch (e) {
      console.log("aborting current chart ");
    }
  }
};

export const getChartData = async (
  page: Page,
  chart: any
): Promise<ChartData> => {
  await page.goto("https://www.beatport.com" + chart.chartUrl);

  const chartTitle = await page.$$eval("h1", (e) => {
    return e[0].textContent;
  });

  const songList = await page.$$eval(".bucket-item", (e) =>
    e.map((e) => {
      return {
        title: e.getAttribute("data-ec-name") ?? "",
        artist: e.getAttribute("data-ec-d1") ?? "",
      };
    })
  );

  const coverURL = await page.$$eval(
    ".interior-release-chart-artwork",
    async (e) => {
      return e[0].getAttribute("src");
    }
  );

  await page.goto(coverURL ?? "");

  const chartCover = await page.screenshot({ encoding: "base64" });

  return { title: chartTitle ?? "Chart", cover: chartCover, tracks: songList };
};
