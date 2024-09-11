import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly healthCheckService: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly client: HttpHealthIndicator,
  ) {}

  checkDB() {
    return this.db.pingCheck('database', { timeout: 2000 });
  }
  checkClient() {
    return this.client.pingCheck(
      'client',
      this.configService.get('NEXT_CLIENT_URL'),
    );
  }
}
