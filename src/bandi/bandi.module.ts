import { Module } from '@nestjs/common';
import { BandiController } from './bandi.controller';
import { BandiService } from './bandi.service';

@Module({
  controllers: [BandiController],
  providers: [BandiService]
})
export class BandiModule {}
