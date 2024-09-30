import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamptz', default: null, nullable: true })
  delete_at: Date;
}
