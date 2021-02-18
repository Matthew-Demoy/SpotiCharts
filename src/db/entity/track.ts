import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Artist } from "./artist";
import { Playlist } from "./playlist";

@Entity()
export class Track {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = '';
    
    @ManyToMany(type => Artist, artist => artist.tracks, {cascade: true, eager:true} )
    @JoinTable()
    artists!: Artist[];

    @ManyToMany(type => Playlist)
    playlists!: Playlist[];
    
    @Column()
    spotifyId: string = ''

    @Column()
    href: string = ''

}