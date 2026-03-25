import { Test, TestingModule } from '@nestjs/testing';
import { BandiController } from './bandi.controller';
import { BandiService } from './bandi.service';

describe('BandiController', () => {
  let controller: BandiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BandiController],
      providers: [
        {
          provide: BandiService,
          useValue: {
            findAll: jest.fn().mockResolvedValue({ total: 0, page: 1, limit: 5, data: [] }),
          },
        },
      ],
    }).compile();

    controller = module.get<BandiController>(BandiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
