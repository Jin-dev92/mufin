import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Music } from '@libs/database/entities';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @OneToMany(() => Music, (music) => music.artist)
  musics: Music[];
}
