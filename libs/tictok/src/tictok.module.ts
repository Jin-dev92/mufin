import { Module } from '@nestjs/common';
import { TictokService } from './tictok.service';

@Module({
  providers: [TictokService],
  exports: [TictokService],
})
export class TictokModule {}
