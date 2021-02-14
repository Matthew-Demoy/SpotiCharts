import "reflect-metadata";
import { createConnection, getCustomRepository } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import { TrackRepository } from "./db/repositories/TrackRepository";
import config from "../ormconfig.json";
import entities from "./db/entity/index";
import { Track } from "./db/entity/track";
import updatePlaylists from "./update";
import { seedCharts, seedSources } from "./seed";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests



createConnection({ ...config, entities } as any)
  .then(async (connection) => {
    
   // await seedCharts()
   // await seedSources()
    await updatePlaylists()
    // create express app
    
    const app = express();
    app.use(bodyParser.json());

    // register all application routes

    // run app
    app.listen(3000);

    const trackRepository = getCustomRepository(TrackRepository);

    const testTrack: Track = {
      id: 1,
      name: "item",
      spotifyId: "123",
      href: "",
      artists: [],
      playlists:  []
    };
    // trackRepository.save(testTrack)

    app.get("/", async (req, res) => {
      console.log("hello");
      const tracks = await trackRepository.find();
      console.log(tracks);
      res.send(tracks);
    });
    console.log("Express application is up and running on port 3000");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
