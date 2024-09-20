import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from '../../services';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('audio')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: new RegExp('mp3|wav|flac|aac|ogg|wma|m4a'),
        })
        .addMaxSizeValidator({ maxSize: 100 * 1024 * 1024 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.MulterS3.File,
  ) {
    const { size, path, mimetype, destination } =
      await this.uploadService.uploadFile(file);
    return {
      path,
      size,
      mimetype,
      destination,
    };
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: new RegExp('mp4|avi|mkv|mov|wmv|flv|webm|m4v|3gp'),
        })
        .addMaxSizeValidator({ maxSize: 200 * 1024 * 1024 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.MulterS3.File,
  ) {
    const { size, path, mimetype, destination } =
      await this.uploadService.uploadFile(file);
    return {
      path,
      size,
      mimetype,
      destination,
    };
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: new RegExp('jpg|jpeg|png|gif|bmp|webp|tiff|svg|ico'),
        })
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.MulterS3.File,
  ) {
    const { size, path, mimetype, destination } =
      await this.uploadService.uploadFile(file);
    return {
      path,
      size,
      mimetype,
      destination,
    };
  }
}
