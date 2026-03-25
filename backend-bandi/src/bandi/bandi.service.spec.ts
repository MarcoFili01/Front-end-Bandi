import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BandiService } from './bandi.service';
import { Bando } from './entities/user.entity';

describe('BandiService', () => {
  let service: BandiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BandiService,
        {
          provide: getRepositoryToken(Bando),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BandiService>(BandiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
