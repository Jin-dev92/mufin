import { Module } from '@nestjs/common';
import { TictokModule } from '@libs/tictok';
import { AuthController } from '../controllers';
import { AuthService } from '../services';

@Module({
  imports: [TictokModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
