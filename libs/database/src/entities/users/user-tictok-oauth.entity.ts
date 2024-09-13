import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAuth } from '@libs/database/entities';

@Entity()
export class UserTictokOauth {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  open_id: string;

  @Column({ type: 'varchar', length: 255 })
  scope: string;

  @Column({ type: 'varchar', length: 10 })
  token_type: string;

  @Column({ type: 'varchar', length: 255 })
  access_token: string;

  @Column({ type: 'varchar', length: 255 })
  refresh_token: string;

  @Column('timestamptz')
  expires_on: Date;

  @Column('timestamptz')
  refresh_expires_on: Date;

  @OneToOne(() => UserAuth, (auth) => auth.id, { nullable: true })
  userAuth: UserAuth;
}
