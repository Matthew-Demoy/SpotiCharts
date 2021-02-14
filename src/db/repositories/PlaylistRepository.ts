import { EntityRepository, getConnection, Repository } from "typeorm";
import { Playlist } from "../entity/playlist";
import { Track } from "../entity/track";

@EntityRepository(Playlist)
export class PlaylistRepository extends Repository<Playlist> {
}
