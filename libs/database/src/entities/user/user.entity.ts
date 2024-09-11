import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsEmail, IsOptional } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @IsEmail()
  @Column({ type: 'varchar', length: 50 })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @IsDate()
  @IsOptional()
  @Column({ type: 'datetime', default: null })
  deleteAt: Date;
}
