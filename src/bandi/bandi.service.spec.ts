import { Test, TestingModule } from '@nestjs/testing';
import { BandiService } from './bandi.service';

describe('BandiService', () => {
  let service: BandiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BandiService],
    }).compile();

    service = module.get<BandiService>(BandiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
