import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- Aggiunto per il database
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BandiModule } from './bandi/bandi.module';

@Module({
  imports: [
    // <-- Inizio blocco database -->
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Sostituisci con il tuo utente (di default è postgres)
      password: 'password', // Sostituisci con la password che hai scelto installando Postgres
      database: 'bandi_db', // Sostituisci con il nome del db che hai appena creato su DBeaver
      autoLoadEntities: true, // Molto comodo: carica in automatico le entità dai tuoi moduli
      synchronize: true, // ATTENZIONE: da usare solo in fase di sviluppo per auto-creare le tabelle
    }),
    // <-- Fine blocco database -->
    BandiModule, // <-- Il tuo modulo originale intatto
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}