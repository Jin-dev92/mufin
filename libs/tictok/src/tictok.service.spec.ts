import { Test, TestingModule } from '@nestjs/testing';
import { TictokService } from './tictok.service';
import { HttpModule } from '@nestjs/axios';

describe('TictokService', () => {
  let service: TictokService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
      ],
      providers: [TictokService],
    }).compile();

    service = module.get<TictokService>(TictokService);
  });

  it('fetchAccessTokenExecute', () => {
    expect(service).toBeDefined();
  });
  it('refreshAccessToken', () => {
    expect(service).toBeDefined();
  });
  it('revokeAccessToken', () => {
    expect(service).toBeDefined();
  });
});
