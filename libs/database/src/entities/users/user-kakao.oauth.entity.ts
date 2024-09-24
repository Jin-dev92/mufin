import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { UserAuth } from '@libs/database';

@Entity()
export class UserKakaoOauth {
  @PrimaryColumn({ type: 'int', unique: true })
  kakaoId: number;

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
