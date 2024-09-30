import { Module } from '@nestjs/common';
import { GoogleApisService } from '../services/google-apis.service';
import { GoogleOauthModule } from '@libs/google-apis/modules/google-oauth.module';

@Module({
  imports: [GoogleOauthModule],
  providers: [GoogleApisService],
  exports: [GoogleApisService],
})
export class GoogleApisModule {}
