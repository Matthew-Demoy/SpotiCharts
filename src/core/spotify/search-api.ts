/// <reference path="../../ninja.d.ts" />

import { Track } from "../../db/entity/track";
import { SearchTypes } from "../../fixtures/enums";

import { fetchRetry } from "../../utils/net";

export const search = async (
  accessToken: string,
  query: string,
  type: SearchTypes
) : Promise<Ninja.SearchResult>=> {
  try {
    const res = await fetchRetry(
      "https://api.spotify.com/v1/search?" + "q=" + query + "&type=" + type,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    return await res;
  } catch (e) {
    console.log("Search Error " + e);
    throw "Search Error " + e;
  }
};
