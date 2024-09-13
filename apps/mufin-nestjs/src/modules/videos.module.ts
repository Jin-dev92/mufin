import { Module } from '@nestjs/common';
import { VideosController } from '../controllers';
import { VideosService } from '../services';

@Module({
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
