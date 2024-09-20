import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAuth } from './user-auth.entity';
import { UserPointHistory } from './user-point-history.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  // @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 8 })
  birth: string;

  @Column({ type: 'int', default: 0 })
  point: number;

  @Column({ type: 'varchar', length: 50 })
  ip: string;

  @Column({ type: 'varchar', length: 255 })
  useragent: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamptz', default: null })
  deleteAt: Date;

  @OneToOne(() => UserAuth, (userAuth) => userAuth.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  auth: UserAuth;

  @OneToMany(
    () => UserPointHistory,
    (userPointHistory) => userPointHistory.user,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  histories: UserPointHistory[];
}
