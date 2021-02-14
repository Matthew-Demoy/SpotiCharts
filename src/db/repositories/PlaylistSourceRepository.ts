import { EntityRepository, Repository } from "typeorm";
import { PlaylistSource } from "../entity/playlist-source";

@EntityRepository(PlaylistSource)
export class PlaylistSourceRepository extends Repository<PlaylistSource>{

}