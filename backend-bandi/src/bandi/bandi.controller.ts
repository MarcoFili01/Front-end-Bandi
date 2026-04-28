import { Controller, Get, Query, Param, Res } from '@nestjs/common';
import { BandiService } from './bandi.service';
import type { Response } from 'express';

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

  @Get(':id/export-pdf')
  async exportPdf(@Param('id') bandoId: string, @Res() res: Response) {
    try {
      const pdfBuffer = await this.bandiService.generateBandoPdf(
        parseInt(bandoId),
      );

      // Imposta gli header per il download del file
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="bando-${bandoId}.pdf"`,
        'Content-Length': pdfBuffer.length,
      });

      res.send(pdfBuffer);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
      res.status(404).json({
        error: 'Bando non trovato',
        message: errorMessage,
      });
    }
  }
}