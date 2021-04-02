import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Playlist } from "../db/entity/playlist";

export const top100Charts: QueryDeepPartialEntity<Playlist>[] = [
  {
    spotifyLink: "0HJxVvvTWtyrClf0cGGJpr",
    beatportLink: "https://www.beatport.com/genre/hard-techno/2/top-100",
    name: "Hard Techno",
    isTop100: true,
  },
  {
    spotifyLink: "1ZT6gWmrYCCCXUZt5Hras9",
    beatportLink: "https://www.beatport.com/genre/deep-house/12/top-100",
    name: "Deep House",
    isTop100: true,
  },
  {
    spotifyLink: "57Eu2FPnaLq5W6Ax9K2uyv",
    beatportLink:
      "https://www.beatport.com/genre/techno-peak-time-driving/6/top-100",
    name: "Techno (Peak Time)",
    isTop100: true,
  },
  {
    spotifyLink: "4l4Rf6aKSeGMwgCWeP1jVH",
    beatportLink:
      "https://www.beatport.com/genre/techno-raw-deep-hypnotic/92/top-100",
    name: "Techno (Raw Hypnotic)",
    isTop100: true,
  },
  {
    spotifyLink: "2q3gbGYUrhfwxJwlHN4rf8",
    beatportLink: "https://www.beatport.com/genre/house/5/top-100",
    name: "House",
    isTop100: true,
  },
  {
    spotifyLink: "4Q9CIgoBRDSFKKd7BtIGLu",
    beatportLink: "https://www.beatport.com/genre/drum-and-bass/1/top-100",
    name: "Drum and Bass",
    isTop100: true,
  },
  {
    spotifyLink: "08nH3w1M13Bz4q3EY21zZZ",
    beatportLink: "https://www.beatport.com/genre/tech-house/11/top-100",
    name: "Tech House",
    isTop100: true,
  },
  {
    spotifyLink: "445uDdAozdPZYHqjHJeeYU",
    beatportLink: "https://www.beatport.com/genre/progressive-house/15/top-100",
    name: "Progressive House",
    isTop100: true,
  },
  {
    spotifyLink: "4OAhIKpU9uLUBnUmuBQkG2",
    beatportLink:
      "https://www.beatport.com/genre/organic-house-downtempo/93/top-100",
    name: "Organic Downtempo",
    isTop100: true,
  },
  {
    spotifyLink: "01pEtB7xzGRO6Cb52IFeSy",
    beatportLink:
      "https://www.beatport.com/genre/garage-bassline-grime/86/top-100",
    name: "Bassline Grime",
    isTop100: true,
  },

  {
    spotifyLink: "5Wvdzjq1MREmpvVtZSwJIz",
    beatportLink: "https://www.beatport.com/genre/dubstep/18/top-100",
    name: "Dubstep",
    isTop100: true,
  },

  {
    spotifyLink: "0T8qIV4HXmtPB4wuGzAlUw",
    beatportLink: "https://www.beatport.com/genre/electro-house/17/top-100",
    name: "Electro House",
    isTop100: true,
  },
  {
    spotifyLink: "64CKg58MKHfMRoLWn8cpF5",
    beatportLink: "https://www.beatport.com/genre/electronica/3/top-100",
    name: "Electronica",
    isTop100: true,
  },
  {
    spotifyLink: "5N80bczCs57DyToyk7KwPc",
    beatportLink:
      "https://www.beatport.com/genre/funky-groove-jackin-house/81/top-100",
    name: "Jackin House",
    isTop100: true,
  },
  {
    spotifyLink: "3HoFsZXRtfQ1U9NlCgEHB0",
    beatportLink: "https://www.beatport.com/genre/future-house/65/top-100",
    name: "Future House",
    isTop100: true,
  },
  {
    spotifyLink: "7Bvh4feHx0W8ADg8lVYTjr",
    beatportLink:
      "https://www.beatport.com/genre/melodic-house-techno/90/top-100",
    name: "Melodic House",
    isTop100: true,
  },
  {
    spotifyLink: "21bxp7DfElvs143xxRMeLW",
    beatportLink: "https://www.beatport.com/genre/bass-house/91/top-100",
    name: "Bass House",
    isTop100: true,
  },
  {
    spotifyLink: "2IMun2qhBX61VntXRsed3X",
    beatportLink: "https://www.beatport.com/genre/breaks-breakbeat-uk-bass/9/top-100",
    name: "Breaks & Breakbeat",
    isTop100: true,
  },
  {
    spotifyLink: "6LpUKA8p7N3sSMxQ5U2Mbw",
    beatportLink: "https://www.beatport.com/genre/dance-electro-pop/39/top-100",
    name: "Dance(EDM)",
    isTop100: true,
  },
  {
    spotifyLink: "1nnzRLCRTd9Es58fKorqLf",
    beatportLink: "https://www.beatport.com/genre/trance/7/top-100",
    name: "Trance",
    isTop100: true,
  },
  {
    spotifyLink: "279KVi54EIUaRhTr0HmjtN",
    beatportLink: "https://www.beatport.com/genre/minimal-deep-tech/14/top-100",
    name: "Deep Tech",
    isTop100: true,
  }

];

export const playlistSources = [
  {
    url: "https://www.beatport.com/charts/all?genres=11",
    name: "Tech House",
  },
  { url: "https://www.beatport.com/charts/all?genres=5", name: "House" },
  {
    url: "https://www.beatport.com/charts/all?genres=92",
    name: "Techno (Raw Hypnotic)",
  },
  {
    url: "https://www.beatport.com/charts/all?genres=15",
    name: "Proggressive House",
  },
];
