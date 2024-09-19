import { Module } from '@nestjs/common';
import { GenresService } from '../services';
import { GenresController } from '../controllers';
import { DatabaseModule } from '@libs/database';

@Module({
  imports: [DatabaseModule],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
