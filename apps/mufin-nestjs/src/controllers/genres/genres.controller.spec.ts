import { Test, TestingModule } from '@nestjs/testing';

import { GenreService } from './genre.service';
import { GenresController } from './genres.controller';

describe('GenreController', () => {
  let controller: GenresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [GenreService],
    }).compile();

    controller = module.get<GenresController>(GenresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
