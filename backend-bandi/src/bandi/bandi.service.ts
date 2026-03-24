import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bando } from './entities/user.entity'; // Assicurati che il percorso sia corretto

@Injectable()
export class BandiService {
  constructor(
    @InjectRepository(Bando)
    private readonly bandoRepository: Repository<Bando>,
  ) {}

  async findAll(query: any) {
    const { search, stato, page = 1 } = query;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Iniziamo a costruire la query
    const queryBuilder = this.bandoRepository.createQueryBuilder('bando');

    // Filtro Testuale (Cerca nel titolo o nell'ente)
    // ILIKE serve per ignorare maiuscole/minuscole in Postgres
    if (search) {
      queryBuilder.andWhere(
        '(bando.titolo ILIKE :search OR bando.ente ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Filtro Stato (Attivo, In arrivo, Chiuso)
    if (stato) {
      queryBuilder.andWhere('LOWER(bando.stato) = LOWER(:stato)', { stato });
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