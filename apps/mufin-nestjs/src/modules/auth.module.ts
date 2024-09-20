import { Module } from '@nestjs/common';
import { TictokModule } from '@libs/tictok';
import { AuthController } from '../controllers';
import { AuthService } from '../services';
import { EncryptionModule } from '@libs/encryption';
import { DatabaseModule } from '@libs/database';
import { KakaoModule } from '@libs/kakao';

@Module({
  imports: [TictokModule, KakaoModule, EncryptionModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
