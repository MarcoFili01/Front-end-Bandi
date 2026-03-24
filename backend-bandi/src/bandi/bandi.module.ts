import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BandiController } from './bandi.controller';
import { BandiService } from './bandi.service';
import { Bando } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bando])],
  controllers: [BandiController],
  providers: [BandiService]
})
export class BandiModule {}
