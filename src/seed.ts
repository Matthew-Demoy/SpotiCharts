import { getRepository } from "typeorm"
import { Playlist } from "./db/entity/playlist"
import { PlaylistSource } from "./db/entity/playlist-source"
import { playlistSources, top100Charts } from "./fixtures/charts"

export const seedCharts = async () => {
    const chartRepo = getRepository(Playlist)

    for( const chart of top100Charts){
        
        const doesExist = await chartRepo.findOne({...chart} as any)
        if(!doesExist)
        {
            await chartRepo.insert({...chart})
        }
    }
}

export const seedSources = async () =>{
    const sourceRepo = getRepository(PlaylistSource)

    for( const source of playlistSources){
       
        const doesExist = await sourceRepo.findOne({...source} as any)
        if(!doesExist)
        {
            await sourceRepo.insert({...source})
        }
    }
}