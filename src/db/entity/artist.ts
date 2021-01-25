
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Track } from "./track";

@Entity()
export class Artist {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = '';
    
   @ManyToMany(type => Track, track => track.artists)
    tracks!: Track[];
}