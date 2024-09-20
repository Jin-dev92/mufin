import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerOptionsFactory } from '@libs/aws/factory';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
