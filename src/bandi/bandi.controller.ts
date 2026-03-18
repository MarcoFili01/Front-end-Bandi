import { Controller, Get, Query } from '@nestjs/common';
import { BandiService } from './bandi.service';

@Controller('api/bandi')
export class BandiController {
  constructor(private readonly bandiService: BandiService) {}

  @Get()
  getBandi(@Query() query: any) {
    return this.bandiService.findAll(query);
  }
}