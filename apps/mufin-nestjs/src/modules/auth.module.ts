import { Module } from '@nestjs/common';
import { TictokModule } from '@libs/tictok';
import { AuthController } from '../controllers';
import { AuthService } from '../services';
import { EncryptionModule } from '@libs/encryption';
import { DatabaseModule } from '@libs/database';

@Module({
  imports: [TictokModule, EncryptionModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
