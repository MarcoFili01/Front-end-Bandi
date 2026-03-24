import { Test, TestingModule } from '@nestjs/testing';
import { BandiController } from './bandi.controller';
import { BandiService } from './bandi.service';

describe('BandiController', () => {
  let controller: BandiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BandiController],
      providers: [BandiService],
    }).compile();

    controller = module.get<BandiController>(BandiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
