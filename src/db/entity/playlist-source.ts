import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlaylistSource {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = '';

    @Column()
    url: string = ''

}