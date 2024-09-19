import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserPointHistory } from '@libs/database/entities';

@Injectable()
export class UserPointHistoryRepository extends Repository<UserPointHistory> {
  /* TYPEORM 함수의 오버라이딩이 필요한 경우 이곳에 구현 */
  constructor(private dataSource: DataSource) {
    super(UserPointHistory, dataSource.createEntityManager());
  }
}
