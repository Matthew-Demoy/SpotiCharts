import fetch from "node-fetch";

export const createPlaylist = async (
  accessToken: string,
  title: string,
  isPublic: boolean = true,
  description?: string
): Promise<SpotifyApi.PlaylistObjectFull> => {
  try {
    var res = await fetch(
      "https://api.spotify.com/v1/users/1265632731/playlists",
      {
        method: "POST",
        headers: {
          Authorization: accessToken,
        },
        body: JSON.stringify({
          name: title ?? "playlist ",
          public: isPublic,
          description: description?.replace(/(\r\n|\n|\r)/gm, ""),
        }),
      }
    );
    return await res.json();
  } catch (e) {
    console.log("createPlaylist Error " + e);
    throw "Error create Playlist " + e;
  }
};

export const getPlaylists = async (
  accessToken: string,
  limit: number = 20,
  offset: number = 0
) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  try {
    var playlists = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: accessToken,
      },
    }).then((res) => {
      return res.json();
    });
    return playlists;
  } catch (e) {
    console.log("error getting playlists " + e);
    return [];
  }
};

export const addTracksToPlaylist = async (
  accessToken: string,
  playListId: string,
  uriArr: string[]
) => {
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: uriArr,
      }),
    }
  ).then((res) => {
    console.log(res.status);
    return res.json();
  });

  return res;
};

export const addCoverToPlayist = async (
  accessToken: string,
  playlistId: string,
  img: string
) => {
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/images`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: img,
      }
    );

    return await res.json;
  } catch (e) {
    console.log("error in addCoverToPlayList" + e);
  }
};

export const changePlaylistsDescription = async (
  accessToken: string,
  playlistId: string,
  description: string
) => {
  try {
    var res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        method: "POST",
        headers: {
          Authorization: accessToken,
        },
        body: JSON.stringify({
          description: description,
        }),
      }
    );
    return await res.json();
  } catch (e) {
    console.log("error in changePlaylistDescription " + e);
  }
};

export const getPlaylist = async (accessToken: string, playlistId: string) : Promise<SpotifyApi.PlaylistObjectFull | undefined>=> {
  try {
    var res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    return await res.json();
  } catch (e) {
    console.log("error in changePlaylistDescription " + e);
  }
};

export const replacePlaylistItems = async (
  accessToken: string,
  playlistId: string,
  trackUris: string[]
) => {
  try {
    var res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "PUT",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      }
    );

    console.log(res.status)
    console.log(await res.json())
    return await res.json();
  } catch (e) {
    console.log("error in changePlaylistDescription " + e);
  }
};
