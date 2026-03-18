import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BandiModule } from './bandi/bandi.module';

@Module({
  imports: [BandiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
