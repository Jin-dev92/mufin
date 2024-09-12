import { Test, TestingModule } from '@nestjs/testing';
import { TictokService } from './tictok.service';

describe('TictokService', () => {
  let service: TictokService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TictokService],
    }).compile();

    service = module.get<TictokService>(TictokService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
