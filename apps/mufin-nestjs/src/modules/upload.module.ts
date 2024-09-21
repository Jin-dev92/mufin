import { Module } from '@nestjs/common';
import { UploadController } from '../controllers';
import { UploadService } from '../services';
import { AwsModule, multerOptionsFactory } from '@libs/aws';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AwsModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
