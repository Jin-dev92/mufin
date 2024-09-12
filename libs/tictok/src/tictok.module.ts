import { Module } from '@nestjs/common';
import { TictokService } from './tictok.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [TictokService],
  exports: [TictokService],
})
export class TictokModule {}
