import { Controller, Get, Query } from '@nestjs/common';
import { BandiService } from './bandi.service';

@Controller('api/bandi')
export class BandiController {
  constructor(private readonly bandiService: BandiService) {}

  @Get()
  async getBandi(@Query() query: any) {
    const result = await this.bandiService.findAll(query);

    // Mappiamo i campi al modello frontend
    const mapped = result.data.map((bando) => ({
      id: bando.id,
      status: bando.stato,
      title: bando.titolo,
      description: bando.enteErogatore,
      tags: bando.settori,
      closingDate:
        bando.dataChiusura instanceof Date
          ? bando.dataChiusura.toISOString().split('T')[0]
          : bando.dataChiusura,
      financialAllocation: bando.dotazioneFinanziaria,
      aidType: bando.tipoAgevolazione,
      territory: bando.territorio,
    }));

    return {
      ...result,
      data: mapped,
    };
  }
}