import { Injectable } from '@nestjs/common';
import { HealthService } from '@libs/health';

@Injectable()
export class AppService {
  constructor(private readonly healthService: HealthService) {}

  async healthCheck() {
    // const db = await this.healthService.checkDB();
    const client = await this.healthService.checkClient();
    return {
      // db,
      client,
    };
  }
}
