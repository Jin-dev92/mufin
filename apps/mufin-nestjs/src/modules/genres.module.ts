import { Module } from '@nestjs/common';
import { GenresService } from '../services';
import { GenresController } from '../controllers';

@Module({
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
