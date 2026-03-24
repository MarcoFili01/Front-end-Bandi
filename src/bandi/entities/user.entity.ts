import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bandi') // Nome della tabella su DBeaver
export class Bando {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titolo: string; // "Sostegno allo sviluppo di competenze specialistiche delle PMI"

  @Column()
  enteErogatore: string; // "Ministero delle Imprese e del Made in Italy (MIMIT)"

  @Column()
  dotazioneFinanziaria: string; // "Fino a €30.000" (Usiamo string per poter scrivere "Fino a...")

  @Column()
  tipoAgevolazione: string; // "Fondo perduto"

  @Column()
  territorio: string; // "Sicilia"

  @Column({ type: 'date' })
  dataChiusura: Date; // "21 Aprile 2026"

  @Column()
  stato: string; // "Attivo" (in futuro potremmo usare un Enum o un boolean)

  // Per i tag (Agroalimentare, Elettronica, Turismo...) usiamo un array!
  // Postgres supporta nativamente gli array, TypeORM li gestisce con 'simple-array'
  @Column('simple-array')
  settori: string[]; 
}