import { Module } from '@nestjs/common';
import { GenreController } from '../controllers';
import { GenreService } from '../services';

@Module({
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
