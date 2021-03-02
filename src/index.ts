require('dotenv').config()
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import config from "./ormconfig";
import entities from "./db/entity/index";
import { Playlist } from "./db/entity/playlist";
import cron from 'node-cron'
import { SubTaskFactory } from "./core/subtask-definition";
import { seedCharts, seedSources } from "./seed";
import updatePlaylists from "./update";
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
    app.use(bodyParser.json());

    // register all application routes

    // run app
    app.listen(8080);

    app.get("/seed/", async (req,res) => {
      console.log('seeding db  (if empty)')
      await seedCharts()
      await seedSources()
    })
    app.get("/update/", async (req, res) => {
      await updatePlaylists()
      console.log('forced update complete')
    });

    app.get("/charts/top-100", async (req, res) => {
      const   isTop100  = req.query.isTop100 || false
      const playlist = await connection.getRepository(Playlist).find({relations: ['tracks'], where : {
        isTop100
      }})
      
      res.send(playlist);
    });

    console.log("Express application is up and running on port 8080");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
