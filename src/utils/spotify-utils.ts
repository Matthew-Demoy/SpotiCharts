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
        console.log(`Getting spotify JSON for ${trackJSON.title} by ${trackJSON.artist}`)
        await setTimeout(() => {}, 500)
        const tracks = await search(
          accessToken,
          trackJSON.title + "+" + trackJSON.artist,
          SearchTypes.TRACK
        );

        if (tracks.tracks.items.length > 0) {
          console.log(`Selected JSON is ${tracks.tracks.items[0].name} by ${tracks.tracks.items[0].artists[0].name}`)
          return tracks.tracks.items[0];
        } else {
          return undefined;
        }
      })
    
  );

  return tracksAsSpotify;
};
