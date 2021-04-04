/// <reference path="./ninja.d.ts" />

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import dotenv from "dotenv";

import { defaultPuppeteerOptions } from "./fixtures/puppeteer";
import { AuthorizeAPI, getToken } from "./core/spotify/auth";
import { createPlaylistFromCharts, updateTop100Chart } from "./scripts/spotify";
import { getConnection } from "typeorm";
import { get } from "http";
import { Playlist } from "./db/entity/playlist";
import { PlaylistSource } from "./db/entity/playlist-source";
import { addCoverToPlayist } from "./core/spotify/playlist-api";
import { getFileAsBase64 } from "./core/file-system";
import { exit } from "process";

const updatePlaylists = async () => {
  puppeteer.use(StealthPlugin());
  dotenv.config();

  const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID ?? "";

  await puppeteer
    .connect({
      browserURL: 'http://3.122.236.133:21222',
      ...defaultPuppeteerOptions,
    })
    .then(async (browser) => {
      // the playlist holding accounts agree for the app to access their playlists
      const code = await AuthorizeAPI(browser);
      // the code is used to get an access token
      const { access_token } = await getToken(
        spotifyClientId,
        spotifyClientSecret,
        code
      );

      
      const topCharts = await getConnection()
        .getRepository(Playlist)
        .find({ isTop100: true });

      for (const chart of topCharts) {
        //update top 100 chart playlists
        await updateTop100Chart(
          browser,
          "Bearer " + access_token,
          chart.spotifyLink,
          chart.beatportLink,
          chart.name
        );
      }
      
      const playlistSources = await getConnection()
        .getRepository(PlaylistSource)
        .find();

      for (const source of playlistSources) {
        await createPlaylistFromCharts(
          browser,
          "Bearer " + access_token,
          source.url,
          source.name
        );
      }
      browser.close();
      return;
    });


};

export default updatePlaylists;
