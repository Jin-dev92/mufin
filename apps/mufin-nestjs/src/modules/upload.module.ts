import { Module } from '@nestjs/common';
import { UploadController } from '../controllers';
import { UploadService } from '../services';
import { AwsModule } from '@libs/aws';

@Module({
  imports: [AwsModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
