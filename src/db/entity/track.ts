import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Artist } from "./artist";

@Entity()
export class Track {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = '';
    
    @ManyToMany(type => Artist, artist => artist.tracks, {cascade: true})
    @JoinTable()
    artists!: Artist[];

    @Column()
    spotifyId: string = ''

    @Column()
    href: string = ''

}