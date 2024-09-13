import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist, Genre } from '@libs/database/entities';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 255 })
  title: string;
  @Column('boolean')
  isAvailable: boolean;
  @Column('varchar')
  coverPath: string;
  @Column('varchar')
  audioPath: string;
  @Column('timestamp')
  createdAt: Date;

  @ManyToOne(() => Artist, (artist) => artist.id)
  artist: Artist;

  @ManyToMany(() => Genre, (genre) => genre.id)
  genres: Genre[];
}
