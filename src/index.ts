/// <reference path="./ninja.d.ts" />

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import dotenv from "dotenv";
import { defaultTaskOptions } from "./fixtures/task-options";
import { purchaseWalmart } from "./sites/Walmart/definition";
import url from "url";

import {
  clickXPath,
  typeXPath,
  waitandRefreshForElement,
} from "./utils/_puppeteerUtils";
import fetch from "node-fetch";
import { defaultPuppeteerOptions } from "./fixtures/puppeteer";
import { AuthorizeAPI, getToken } from "./core/spotify/auth";
import { createPlaylistFromCharts } from "./scripts/spotify";

puppeteer.use(StealthPlugin());
dotenv.config();

const spotifyPassword = process.env.SPOTIFY_PASSWORD ?? "";
const spotifyUsername = process.env.SPOTIFY_USERNAME ?? "";

const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID ?? "";

const beatportUrl = "https://www.beatport.com/top-100";

/* 
define a routine
  -user(userinfo)
    -username
    -password
  -type (chart, chart list)
  -live (true, false)
*/

puppeteer
  .launch({
    ...defaultPuppeteerOptions,
  })
  .then(async (browser) => {
    // the playlist holding accounts agree for the app to access their playlists
    const code = await AuthorizeAPI(browser);

    
    // the code is used to get an access token
    const {
      access_token,
      expires_in,
      refresh_token,
      scope,
      token_type,
    } = await getToken(spotifyClientId, spotifyClientSecret, code);
    
    // add new beatport charts as spotify playlists
    await createPlaylistFromCharts(browser, "Bearer " + access_token, '1265632731')


  });
