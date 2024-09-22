import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAuth } from '@libs/database';

@Entity()
export class UserKakaoOauth {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  id_token: string;

  @Column({ type: 'varchar', length: 255 })
  access_token: string;

  @Column({ type: 'varchar', length: 255 })
  refresh_token: string;

  @Column('timestamptz')
  expires_on: Date;

  @Column('timestamptz')
  refresh_expires_on: Date;

  @OneToOne(() => UserAuth, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  userAuth: UserAuth;
}
