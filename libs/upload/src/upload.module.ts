import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from './factory';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  providers: [UploadService],
})
export class UploadModule {}
