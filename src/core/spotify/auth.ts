import fetch from "node-fetch";
import { Browser } from "puppeteer";
import { clickXPath, typeXPath, waitandRefreshForElement } from "../../utils/_puppeteerUtils";
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;

//get login prompt

const getLoginPrompt = async (clientId: string) => {
  const encodedId = btoa(clientId);

  const auth = await fetch("https://accounts.spotify.com/authorize", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      client_id: encodedId,
      redirect_uri: `localhost:8000/success`,
      response_type: `code`,
    },
  });
};

export const getToken = async (
  clientId: string,
  clientSecret: string,
  code: string
) => {
  const encodedId =
    "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64");

  const UrlParams = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://beatport.com/top-100",
  });

  const auth = await fetch(
    "https://accounts.spotify.com/api/token?" + UrlParams.toString(),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: encodedId,
      },
    }
  );
  return await auth.json();
};

export const loginUI = async (
  page: any,
  username: string,
  password: string
) => {
  await typeXPath(page, `//*[@id="login-username"]`, username);
  await typeXPath(page, `//*[@id="login-password"]`, password);
  await clickXPath(page, `//*[@id="login-button"]`);
};

export const AuthorizeAPI = async (browser: Browser) => {
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on("request", (request) => {
    // Do nothing in case of non-navigation requests.
    if (!request.isNavigationRequest()) {
      request.continue();
      return;
    }
    // Add a new header for navigation request.
    const headers = request.headers();
    headers["client_id"] = "292abb096d7e423180ba871ac237468e" || "";
    headers["response_type"] = "code";
    headers["redirect_uri"] = `localhost:8080/success`;
    request.continue({ headers });
  });
  const spotifyUrlParmas = new URLSearchParams({
    client_id: "292abb096d7e423180ba871ac237468e" ?? "",
    redirect_uri: `http://beatport.com/top-100`,
    response_type: `code`,
  });

  spotifyUrlParmas.append("scope", "playlist-modify-public playlist-modify-private playlist-read-private ugc-image-upload");


  await page.goto(
    `https://accounts.spotify.com/authorize?` + spotifyUrlParmas.toString()
  );

  loginUI(page, "mattdabom5@gmail.com", "*p~^esV38uMYt97");

  await waitandRefreshForElement(page, `/html/body/div[1]/div/header/a`);

  const authSuccessUrl = await page.url();
  return new URL(authSuccessUrl).searchParams.get("code") ?? "";
};
