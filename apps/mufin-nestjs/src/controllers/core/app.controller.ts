import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../services/core/app.service';
import { CustomHealthCheck } from '@libs/health';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @CustomHealthCheck()
  @Get('/')
  async healthCheck() {
    return await this.appService.healthCheck();
  }
}
