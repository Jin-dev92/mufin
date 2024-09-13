import { Module } from '@nestjs/common';
import { MusicsController } from '../controllers';
import { MusicsService } from '../services';

@Module({
  controllers: [MusicsController],
  providers: [MusicsService],
})
export class MusicsModule {}
