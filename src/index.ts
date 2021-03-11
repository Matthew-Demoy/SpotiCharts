require('dotenv').config()
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import config from "./ormconfig";
import entities from "./db/entity/index";
import { Playlist } from "./db/entity/playlist";
import cron from 'node-cron'
import { seedCharts, seedSources } from "./seed";
import updatePlaylists from "./update";
import cors from 'cors'
// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
var updateTask = cron.schedule('* * 1,13 * *',async () =>  {
  await updatePlaylists()
  console.log('cron update complete')
}, {
  scheduled: false
});
 
updateTask.start()


createConnection({ ...config, entities } as any)
  .then(async (connection) => {
       

   // await updatePlaylists()
    // create express app
    
    const app = express();
    app.use(cors())
    app.use(bodyParser.json());

    // register all application routes

    // run app
    app.listen(8080);

    app.get("/", async (req,res) => {
      res.status(200).send('success beat-chart');
    })

    app.get("/api/seed/", async (req,res) => {
      console.log('seeding db  (if empty)')
      await seedCharts()
      await seedSources()
      res.status(200).send('seed success')
    })
    app.get("/api/update/", async (req, res) => {
      await updatePlaylists()
      res.status(200).send('forced update complete')
    });

    app.get("/api/charts/top-100", async (req, res) => {
      const   isTop100  = req.query.isTop100 || false
      const playlist = await connection.getRepository(Playlist).find({relations: ['tracks'], where : {
        isTop100
      }})
      
      res.status(200).send(playlist);
    });

    console.log("Express application is up and running on port 8080");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
