import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TerminusModule, HttpModule],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
