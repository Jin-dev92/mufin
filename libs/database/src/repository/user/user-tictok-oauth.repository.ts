import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserTictokOauth } from '@libs/database/entities';

@Injectable()
export class UserTictokOauthRepository extends Repository<UserTictokOauth> {
  /* TYPEORM 함수의 오버라이딩이 필요한 경우 이곳에 구현 */
  constructor(private dataSource: DataSource) {
    super(UserTictokOauth, dataSource.createEntityManager());
  }
}
