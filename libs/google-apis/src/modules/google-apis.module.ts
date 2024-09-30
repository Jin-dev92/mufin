import { Module } from '@nestjs/common';
import { GoogleApisService } from '../services/google-apis.service';

@Module({
  providers: [GoogleApisService],
  exports: [GoogleApisService],
})
export class GoogleApisModule {}
