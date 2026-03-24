import { Controller, Get, Query } from '@nestjs/common';
import { BandiService } from './bandi.service';

@Controller('api/bandi')
export class BandiController {
  constructor(private readonly bandiService: BandiService) {}

  @Get()
  async getBandi(@Query() query: any) {
    // Il database richiede tempo per rispondere, quindi usiamo await
    return await this.bandiService.findAll(query);
  }
}