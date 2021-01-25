import {EntityRepository, Repository} from "typeorm"
import {Track} from '../entity/track'

@EntityRepository(Track)
export class TrackRepository extends Repository<Track>{

}