import { Browser, Page } from "puppeteer";
import { getConnection, RelationQueryBuilder } from "typeorm";
import {
  addTracksToPlaylist,
  changePlaylistsDescription,
  createPlaylist,
  getPlaylist,
  getPlaylists,
  replacePlaylistItems,
} from "../core/spotify/playlist-api";
import { search } from "../core/spotify/search-api";
import { Playlist } from "../db/entity/playlist";
import { Track } from "../db/entity/track";
import { PlaylistRepository } from "../db/repositories/PlaylistRepository";
import { TrackRepository } from "../db/repositories/TrackRepository";
import { SearchTypes } from "../fixtures/enums";
import {
  getChartsFromPage,
  getTracksFromTop100,
} from "../utils/beatport-utils";
import { startLog } from "../utils/logger";
import { getSpotifyJSONForTrackList } from "../utils/spotify-utils";

interface ChartData {
  title: string;
  cover: any;
  tracks: { title: string; artist: string }[];
  description: string;
}
export const createPlaylistFromCharts = async (
  browser: Browser,
  access_token: string,

  chart_url: string,
  name: string = ""
) => {
  startLog(name);
  const page = await browser.newPage();

  await page.goto(chart_url);

  const chartJSONArr = await getChartsFromPage(page);

  for (var chart of chartJSONArr) {
    if (!chart.isArtist) {
      return;
    }
    try {
      const page = await browser.newPage();
      const chartData = await getChartData(page, chart);
      if (chartData === undefined) {
        continue;
      }
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
        console.log(
          `duplicate playlist found for chart ${chartData.title} - not adding`
        );
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
        .map((track: any) => {
          return track.uri;
        });

      //create playlist
      const playlist = await createPlaylist(
        access_token,
        chartData.title,
        true,
        chartData.description
      );
      console.log("playlist created " + playlist.name);

      console.log("adding tracks to playlist");
      const playlistSnapshot = await addTracksToPlaylist(
        access_token,
        playlist.id,
        spotifyURIs
      );

      //add cover
      //await addCoverToPlayist(access_token, playlist.id, chartData.cover);
    } catch (e) {
      console.log("aborting current chart ");
    }
  }
};

export const getChartData = async (
  page: Page,
  chart: any
): Promise<ChartData | undefined> => {
  try {
    await page.goto("https://www.beatport.com" + chart.chartUrl);

    var description = "";

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

    await page
      .$x(
        '//*[@id="pjax-inner-wrapper"]/section/main/div[2]/ul/li[1]/span[2]/a'
      )
      .then(async (elements) => {
        let el = elements[0];
        const temp = await el
          .evaluate((el) => (el as HTMLElement).innerText, el)
          .then((e) => e);
        description = description + "Artist: " + temp + " ";
      });

    const res = await page.$$eval(
      "li.interior-release-chart-content-item",
      (items) => {
        let temp = "";
        items.forEach((item) => {
          temp = temp + (item as HTMLElement).innerText + " ";
        });
        return temp;
      }
    );

    description =
      description +
      " - " +
      res +
      " - https://www.beatport.com" +
      chart.chartUrl;

    await page.goto(coverURL ?? "");

    const chartCover = await page.screenshot({ encoding: "base64" });
    page.close();
    return {
      title: chartTitle ?? "Chart",
      cover: chartCover,
      tracks: songList,
      description: description,
    };
  } catch (e) {
    console.log("error in get chart data " + e);
  }
};

export const updateTop100Chart = async (
  browser: Browser,
  access_token: string,
  playlistId: string,
  chartUrl: string,
  name: string = ""
) => {
  startLog(name);
  //get playlist track names and artists
  const currPlaylist = await getPlaylist(access_token, playlistId);
  if (currPlaylist === undefined) {
    console.log("undefined playlist ABORT");
    return;
  }
  //get chart track list
  const chartData = await getTracksFromTop100(browser, chartUrl);

  var trackUris: any[] = [];
  const connection = await getConnection();
  const trackRepository = connection.getRepository(Track);
  const playlistRepo = connection.getRepository(Playlist);
  const playlistObject = await playlistRepo.findOne(
    { name: name },
    { relations: ["tracks"] }
  );
  
  if (!playlistObject) {
    return;
  }
  playlistObject.tracks.length = 0;
  playlistRepo.save(playlistObject)
  for await (const track of chartData) {
    const match = await trackRepository.findOne(
      { name: track.track },
      { relations: ["artists"] }
    );
    if (match) {
      console.log(`Match Found for ${track.track} by ${track.artist}.`);

      playlistRepo.save({
        ...playlistObject,
        tracks: [...playlistObject.tracks, match],
      });

      trackUris.push(match?.href);
    } else {
      console.log(
        `No match found for ${track.track} by ${track.artist}. \n Searching Spotify a likely Match`
      );
      const tracks = await search(
        access_token,
        track.track + "+" + track.artist,
        SearchTypes.TRACK
      );
      //else find spotify url
      if (tracks === undefined) {
        return undefined;
      }
      if (tracks.tracks?.items.length > 0) {
        const match = tracks.tracks.items[0];
        console.log(`Search found ${match.name} by ${match.artists[0].name}`);

        trackUris.push(tracks.tracks.items[0].uri);
        const trackDto = {
          name: match.name,
          artists: match.artists.map((e: any) => {
            return { name: e.name };
          }),
          spotifyId: match.uri,
          href: track.href,
        };
        // const track = await trackRepository.insert(trackDto))
        /*
        connection.createQueryBuilder()
        .relation(Playlist, 'tracks')
        .of(playlistObject)
        .add(trackDto)
        */
       const existing = await trackRepository.findOne({name: trackDto.name}, 
        { relations: ["artists"] })
        playlistObject.tracks.push(existing || await trackRepository.save(trackDto));
        playlistRepo.save(playlistObject);
      }
    }
  }
  //for earch track in chart, see if it already exists in the playlist
  for (let i = 0; i < chartData.length; i++) {
    const chartTrack = chartData[i];

    console.log(`Adding #${i} ${chartTrack.track} by ${chartTrack.artist}`);
    const match = currPlaylist.tracks?.items.find((playlistTrack) => {
      return (
        playlistTrack.track.name.toLowerCase() ===
          chartTrack.track?.toLocaleLowerCase() &&
        chartTrack.artist
          ?.toLowerCase()
          .includes(playlistTrack.track.artists[0].name.toLowerCase())
      );
    });
  }

  await setTimeout(() => {}, 5000);
  //call modifcation to playlist
  await replacePlaylistItems(
    access_token,
    playlistId,
    trackUris
      .filter((uri) => {
        return uri !== undefined;
      })
      .slice(0, 100)
  );

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const dateString = mm + "/" + dd + "/" + yyyy;

  await changePlaylistsDescription(
    access_token,
    playlistId,
    "Updated " + dateString
  );
  return;
};
