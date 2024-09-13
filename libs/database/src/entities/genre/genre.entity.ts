import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 10 })
  code: string;

  @Column('varchar', { length: 100 })
  name: string;
}
