import fetch from "node-fetch";
import { search } from "../core/spotify/search-api";
import { SearchTypes } from "../fixtures/enums";

export const getTracksJSONFromApi = () => {};

interface Track {
  title: string;
  artist: string;
}

export const getSpotifyJSONForTrackList = async (
  accessToken: string,
  trackJSONArr: Track[]
) => {
  const tracksAsSpotify = await Promise.all(
    trackJSONArr
      .map(async (trackJSON) => {

        await setTimeout(() => {}, 500)
        const tracks = await search(
          accessToken,
          trackJSON.title + "+" + trackJSON.artist,
          SearchTypes.TRACK
        );

        if (tracks.tracks.items.length > 0) {
          return tracks.tracks.items[0];
        } else {
          return undefined;
        }
      })
    
  );

  return tracksAsSpotify;
};
