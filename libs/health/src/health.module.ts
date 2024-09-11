import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
