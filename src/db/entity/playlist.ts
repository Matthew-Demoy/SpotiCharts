import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Track } from "./track";
//https://www.beatport.com/genre/big-room/79/top-100
//https://www.beatport.com/chart/artist-of-the-month/659738
@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @ManyToMany((type) => Track)
  @JoinTable()
  tracks!: Track[];

  @Column({ type: "date", default: new Date() })
  dateCreated: Date = new Date();

  @Column({ type: "date", default: new Date() })
  lastUpdated: Date = new Date();

  @Column()
  beatportLink: string = "";
  @Column()
  spotifyLink: string = "";

  @Column({ default: "" })
  cover: string = "";

  @Column()
  isTop100: boolean = false;
}
