import { Controller, Get } from '@nestjs/common';
import { CustomHealthCheck } from '@libs/health';
import { AppService } from '../../services';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @CustomHealthCheck()
  @Get('/')
  async healthCheck() {
    return await this.appService.healthCheck();
  }
}
