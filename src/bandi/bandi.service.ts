import { Injectable } from '@nestjs/common';
import { Bando } from './bando.interface';

@Injectable()
export class BandiService {
  // Mock data basato sull'immagine
  private bandi: Bando[] = Array.from({ length: 20 }).map((_, i) => ({
    id: i.toString(),
    stato: i % 3 === 0 ? 'Attivo' : i % 3 === 1 ? 'In arrivo' : 'Chiuso',
    titolo: 'Sostegno allo sviluppo di competenze specialistiche delle PMI',
    ente: 'Ministero delle Imprese e del Made in Italy (MIMIT)',
    tags: ['Agroalimentare', 'Elettronica', 'Turismo', 'Salute', 'Cultura', 'Tecnologia', 'Parco batterie', '+3'],
    dataChiusura: '21 Aprile 2026',
    dotazioneFinanziaria: 'Fino a €30.000',
    tipoAgevolazione: 'Fondo perduto',
    territorio: 'Sicilia'
  }));

  findAll(query: any) {
    let filteredBandi = [...this.bandi];

    // Filtro Testuale
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredBandi = filteredBandi.filter(b => 
        b.titolo.toLowerCase().includes(searchLower) || 
        b.ente.toLowerCase().includes(searchLower)
      );
    }

    // Filtro Stato (Aperti, In arrivo, Chiusi)
    if (query.stato) {
      filteredBandi = filteredBandi.filter(b => b.stato.toLowerCase() === query.stato.toLowerCase());
    }

    // Paginazione
    const page = query.page ? parseInt(query.page) : 1;
    const limit = 5; // Come nell'immagine, circa 5 per pagina visibili
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return {
      total: filteredBandi.length,
      page,
      limit,
      data: filteredBandi.slice(startIndex, endIndex)
    };
  }
}