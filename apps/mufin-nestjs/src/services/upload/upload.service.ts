import { Injectable } from '@nestjs/common';
import { AwsService } from '@libs/aws';

@Injectable()
export class UploadService {
  constructor(private readonly awsService: AwsService) {}

  async uploadFile(file: Express.MulterS3.File) {
    try {
      return this.awsService.uploadFile(file);
    } catch (e) {
      throw e;
    }
  }
}
