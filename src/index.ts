/// <reference path="./ninja.d.ts" />

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import dotenv from "dotenv";

import { defaultPuppeteerOptions } from "./fixtures/puppeteer";
import { AuthorizeAPI, getToken } from "./core/spotify/auth";
import { createPlaylistFromCharts, updateTop100Chart } from "./scripts/spotify";


puppeteer.use(StealthPlugin());
dotenv.config();



const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID ?? "";



puppeteer
  .launch({
    ...defaultPuppeteerOptions,
  })
  .then(async (browser) => {
    /*
    fetchRetry("localhost:5000", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    return;
*/
    // the playlist holding accounts agree for the app to access their playlists
    const code = await AuthorizeAPI(browser);
    // the code is used to get an access token
    const {
      access_token,

    } = await getToken(spotifyClientId, spotifyClientSecret, code);

    //update top 100 chart playlists
    
    
    await updateTop100Chart(
      browser,
      "Bearer " + access_token,
      "0HJxVvvTWtyrClf0cGGJpr",
      "https://www.beatport.com/genre/hard-techno/2/top-100",
      "Hard Techno"
    );
    
    await updateTop100Chart(
      browser,
      "Bearer " + access_token,
      "1ZT6gWmrYCCCXUZt5Hras9",
      "https://www.beatport.com/genre/deep-house/12/top-100",
      "Deep House"
    );

    await updateTop100Chart(
      browser,
      "Bearer " + access_token,
      "57Eu2FPnaLq5W6Ax9K2uyv",
      "https://www.beatport.com/genre/techno-peak-time-driving/6/top-100",
      "Top 100, Techno (Peak Time)"
    );
    await updateTop100Chart(
      browser,
      "Bearer " + access_token,
      "4l4Rf6aKSeGMwgCWeP1jVH",
      "https://www.beatport.com/genre/techno-raw-deep-hypnotic/92/top-100",
      "Techno (Raw Hypnotic)"
    );
    await updateTop100Chart(
      browser,
      "Bearer " + access_token,
      "2q3gbGYUrhfwxJwlHN4rf8",
      "https://www.beatport.com/genre/house/5/top-100",
      "Top 100, House"
    );
    await updateTop100Chart(
      browser,
      "Bearer " + access_token,
      "4Q9CIgoBRDSFKKd7BtIGLu",
      "https://www.beatport.com/genre/drum-and-bass/1/top-100",
      "Top 100, Drum and Bass"
    );
    
    await updateTop100Chart(
      browser,
      "Bearer " + access_token,
      "08nH3w1M13Bz4q3EY21zZZ",
      "https://www.beatport.com/genre/tech-house/11/top-100",
      "Top 100, Tech House"
    );
    await updateTop100Chart(
      browser,
      "Bearer " + access_token,
      "445uDdAozdPZYHqjHJeeYU",
      "https://www.beatport.com/genre/progressive-house/15/top-100",
      "Top 100, Progressive House"
    );
    await updateTop100Chart(
      browser,
      "Bearer " + access_token,
      "4OAhIKpU9uLUBnUmuBQkG2",
      "https://www.beatport.com/genre/organic-house-downtempo/93/top-100",
      "Top 100, Organic Downtempo"
    );
    await updateTop100Chart(
      browser,
      "Bearer " + access_token,
      "01pEtB7xzGRO6Cb52IFeSy",
      "https://www.beatport.com/genre/garage-bassline-grime/86/top-100",
      "Top 100, Bassline Grime"
    );

    // add new beatport charts as spotify playlists
    await createPlaylistFromCharts(
      browser,
      "Bearer " + access_token,
      "1265632731",
      "https://www.beatport.com/charts/all?genres=11",
      "Tech House"

    );
    await createPlaylistFromCharts(
      browser,
      "Bearer " + access_token,
      "1265632731",
      "https://www.beatport.com/charts/all?genres=5",
      "House"
    );
    await createPlaylistFromCharts(
      browser,
      "Bearer " + access_token,
      "1265632731",
      "https://www.beatport.com/charts/all?genres=92",
      "Techno (Raw Hypnotic)"
    );

    await createPlaylistFromCharts(
      browser,
      "Bearer " + access_token,
      "1265632731",
      "https://www.beatport.com/charts/all?genres=15",
      "Progressive House"
    );

    browser.close();
    return;
  });
