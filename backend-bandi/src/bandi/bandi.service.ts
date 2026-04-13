import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bando } from './entities/user.entity'; // Assicurati che il percorso sia corretto

@Injectable()
export class BandiService implements OnModuleInit {
  constructor(
    @InjectRepository(Bando)
    private readonly bandoRepository: Repository<Bando>,
  ) {}

  // --- LOGICA DI SEEDING (Aggiunta) ---
  async onModuleInit() {
    const doSeed = process.env.DB_SEED === 'true';

    if (doSeed) {
      const count = await this.bandoRepository.count();
      if (count === 0) {
        console.log('🌱 Database vuoto. Inserimento 20 bandi di mock...');
        await this.seedBandi();
      } else {
        console.log('✅ Dati già presenti. Seeding saltato.');
      }
    }
  }

  private async seedBandi() {
    const mockData: Partial<Bando>[] = [
      { titolo: 'Sviluppo Imprese Femminili 2026', enteErogatore: 'MIMIT', dotazioneFinanziaria: 'Fino a € 50.000', tipoAgevolazione: 'Fondo perduto', territorio: 'Sicilia', dataChiusura: new Date('2026-03-15'), stato: 'Attivo', settori: ['Sociale', 'Donne'] },
      { titolo: 'Bonus Export Digitale Plus', enteErogatore: 'ICE', dotazioneFinanziaria: 'Voucher € 10.000', tipoAgevolazione: 'Voucher', territorio: 'Nazionale', dataChiusura: new Date('2025-11-30'), stato: 'Attivo', settori: ['Digitale', 'Export'] },
      { titolo: 'Bando Agrisolare III', enteErogatore: 'Ministero Agricoltura', dotazioneFinanziaria: '80% spese', tipoAgevolazione: 'Fondo perduto', territorio: 'Nazionale', dataChiusura: new Date('2026-06-20'), stato: 'Attivo', settori: ['Agricoltura', 'Energia'] },
      { titolo: 'Internazionalizzazione Lombardia', enteErogatore: 'Regione Lombardia', dotazioneFinanziaria: '€ 15.000', tipoAgevolazione: 'Fondo perduto', territorio: 'Lombardia', dataChiusura: new Date('2025-09-10'), stato: 'Attivo', settori: ['Export', 'PMI'] },
      { titolo: 'Resto al Sud 2026', enteErogatore: 'Invitalia', dotazioneFinanziaria: 'Fino a € 200.000', tipoAgevolazione: 'Finanziamento', territorio: 'Sud Italia', dataChiusura: new Date('2026-12-31'), stato: 'Attivo', settori: ['Startup', 'Artigianato'] },
      { titolo: 'Nuove Imprese Tasso Zero', enteErogatore: 'Invitalia', dotazioneFinanziaria: 'Copertura 90%', tipoAgevolazione: 'Finanziamento', territorio: 'Nazionale', dataChiusura: new Date('2026-12-31'), stato: 'Attivo', settori: ['Giovani', 'Innovazione'] },
      { titolo: 'Ricerca e Sviluppo Campania', enteErogatore: 'Regione Campania', dotazioneFinanziaria: '€ 100.000', tipoAgevolazione: 'Fondo perduto', territorio: 'Campania', dataChiusura: new Date('2025-05-22'), stato: 'Attivo', settori: ['Ricerca', 'BioTech'] },
      { titolo: 'Voucher Connettività', enteErogatore: 'MIMIT', dotazioneFinanziaria: '€ 2.500', tipoAgevolazione: 'Voucher', territorio: 'Nazionale', dataChiusura: new Date('2024-12-31'), stato: 'Chiuso', settori: ['Digitale'] },
      { titolo: 'Efficienza Energetica Piemonte', enteErogatore: 'Regione Piemonte', dotazioneFinanziaria: '€ 40.000', tipoAgevolazione: 'Fondo perduto', territorio: 'Piemonte', dataChiusura: new Date('2025-07-15'), stato: 'Attivo', settori: ['Energia', 'Ambiente'] },
      { titolo: 'Turismo 4.0', enteErogatore: 'Ministero Turismo', dotazioneFinanziaria: 'Credito 50%', tipoAgevolazione: 'Credito d imposta', territorio: 'Nazionale', dataChiusura: new Date('2026-01-20'), stato: 'Attivo', settori: ['Turismo', 'Digitale'] },
      { titolo: 'Startup Lazio 2025', enteErogatore: 'Regione Lazio', dotazioneFinanziaria: '€ 50.000', tipoAgevolazione: 'Fondo perduto', territorio: 'Lazio', dataChiusura: new Date('2025-10-05'), stato: 'Attivo', settori: ['Startup', 'Tecnologia'] },
      { titolo: 'Credito ZES Unica', enteErogatore: 'Agenzia Entrate', dotazioneFinanziaria: 'Variabile', tipoAgevolazione: 'Credito d imposta', territorio: 'Mezzogiorno', dataChiusura: new Date('2024-11-15'), stato: 'Attivo', settori: ['Investimenti', 'Sud'] },
      { titolo: 'Digitalizzazione Milano', enteErogatore: 'CCIAA Milano', dotazioneFinanziaria: '€ 10.000', tipoAgevolazione: 'Voucher', territorio: 'Lombardia', dataChiusura: new Date('2025-04-30'), stato: 'Attivo', settori: ['Digitale', 'PMI'] },
      { titolo: 'Economia Circolare', enteErogatore: 'MASE', dotazioneFinanziaria: 'Fino a € 150.000', tipoAgevolazione: 'Fondo perduto', territorio: 'Nazionale', dataChiusura: new Date('2025-08-12'), stato: 'Attivo', settori: ['Sostenibilità', 'Riciclo'] },
      { titolo: 'Fondo Impresa Donna', enteErogatore: 'Invitalia', dotazioneFinanziaria: 'Fino a € 250.000', tipoAgevolazione: 'Fondo perduto', territorio: 'Nazionale', dataChiusura: new Date('2026-02-14'), stato: 'Attivo', settori: ['Donne', 'PMI'] },
      { titolo: 'Formazione 4.0', enteErogatore: 'Ministero Lavoro', dotazioneFinanziaria: 'Credito d imposta', tipoAgevolazione: 'Credito d imposta', territorio: 'Nazionale', dataChiusura: new Date('2025-12-31'), stato: 'Attivo', settori: ['Formazione', 'Digitale'] },
      { titolo: 'Consulenza Veneto', enteErogatore: 'Regione Veneto', dotazioneFinanziaria: '€ 8.000', tipoAgevolazione: 'Voucher', territorio: 'Veneto', dataChiusura: new Date('2025-06-18'), stato: 'Attivo', settori: ['Consulenza', 'Innovazione'] },
      { titolo: 'Borghi e Cultura', enteErogatore: 'Ministero Cultura', dotazioneFinanziaria: '€ 200.000', tipoAgevolazione: 'Fondo perduto', territorio: 'Nazionale', dataChiusura: new Date('2025-11-05'), stato: 'Attivo', settori: ['Cultura', 'Turismo'] },
      { titolo: 'Digital Transformation', enteErogatore: 'Invitalia', dotazioneFinanziaria: '50% spese', tipoAgevolazione: 'Finanziamento', territorio: 'Nazionale', dataChiusura: new Date('2025-03-25'), stato: 'In arrivo', settori: ['Digitale', 'Software'] },
      { titolo: 'Green Transition Toscana', enteErogatore: 'Regione Toscana', dotazioneFinanziaria: '€ 60.000', tipoAgevolazione: 'Fondo perduto', territorio: 'Toscana', dataChiusura: new Date('2026-05-10'), stato: 'Attivo', settori: ['Ambiente', 'Manifattura'] }
    ];

    await this.bandoRepository.save(mockData);
    console.log('🚀 Seeding completato!');
  }

  // --- TUA FUNZIONE ORIGINALE (Invariata) ---
  async findAll(query: any) {
    const { search, stato, page = 1 } = query;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Iniziamo a costruire la query
    const queryBuilder = this.bandoRepository.createQueryBuilder('bando');

    // Filtro Stato (Attivo, In arrivo, Chiuso)
    if (stato) {
      queryBuilder.andWhere('LOWER(bando.stato) = LOWER(:stato)', { stato });
    }

    // Filtro Testuale (Cerca nel titolo o nell'ente erogatore)
    if (search) {
      queryBuilder.andWhere(
        '(bando.titolo ILIKE :search OR bando."enteErogatore" ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Paginazione e recupero dati
    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('bando.id', 'DESC') // Mostra i più recenti per primi
      .getManyAndCount();

    return {
      total,
      page: Number(page),
      limit,
      data,
    };
  }
}