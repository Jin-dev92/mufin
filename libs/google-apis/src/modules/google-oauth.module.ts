import { Module } from '@nestjs/common';
import { GoogleOauthService } from '@libs/google-apis/services';

@Module({
  providers: [GoogleOauthService],
  exports: [GoogleOauthService],
})
export class GoogleOauthModule {}
