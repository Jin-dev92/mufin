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
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar', { length: 255 })
  title: string;
  @Column('boolean')
  is_available: boolean;
  @Column('varchar')
  cover_path: string;
  @Column('varchar')
  audio_path: string;
  @Column('timestamptz')
  created_at: Date;

  @ManyToOne(() => Artist, (artist) => artist.id)
  artist: Artist;

  @ManyToMany(() => Genre, (genre) => genre.id)
  genres: Genre[];
}
