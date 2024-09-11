import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly client: HttpHealthIndicator,
  ) {}

  checkDB() {
    return this.db.pingCheck('database');
  }
  checkClient() {
    return this.client.pingCheck(
      'client',
      this.configService.get('NEXT_PUBLIC_LOCATION'),
    );
  }
}
