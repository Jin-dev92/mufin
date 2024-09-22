import { Module } from '@nestjs/common';
import { UsersController } from '../controllers';
import { UsersService } from '../services';
import { DatabaseModule } from '@libs/database';
import { EncryptionModule } from '@libs/encryption';

@Module({
  imports: [DatabaseModule, EncryptionModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
