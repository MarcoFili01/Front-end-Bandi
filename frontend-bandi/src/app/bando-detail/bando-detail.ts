import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// NOTA: Sostituisci questa interfaccia con quella reale che usi nel tuo progetto
interface BandoDetail {
  titolo: string;
  tags: string[];
  stato: string;
  dataApertura: string;
  dataChiusura: string;
  budget: string;
  regione: string;
  settore: string;
  obiettivo: string;
  formaAgevolazione: string;
}

@Component({
  selector: 'app-bando-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bando-detail.html',
  styleUrls: ['./bando-detail.scss']
})
export class BandoDetailComponent implements OnInit {
  // Dati mockati basati sul tuo design
  bando: BandoDetail = {
    titolo: 'Sostegno allo sviluppo di competenze specialistiche delle PMI',
    tags: [
      'Agroalimentare', 'Elettronica', 'Turismo', 'Salute', 'Cultura', 
      'Salute', 'Letteratura ed editoria', 'Tecnologia', 
      'Meccanica-Meccatronica e Automazione', 'Agricoltura-agroindustria', 
      'Pacco batterie', 'Industria'
    ],
    stato: 'Attivo',
    dataApertura: '21 Apr 2026',
    dataChiusura: '23 Giu 2026',
    budget: '10.000 €',
    regione: 'Sicilia',
    settore: 'Elettronica',
    obiettivo: 'Transizione ecologica',
    formaAgevolazione: 'Capitale di rischio'
  };

  bandoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Recupera l'ID dall'URL
    this.bandoId = this.route.snapshot.paramMap.get('id');
    console.log('ID Bando:', this.bandoId);
    
    // Qui andrai a recuperare l'ID dall'URL e farai la chiamata al service
    // const id = this.route.snapshot.paramMap.get('id');
    // this.bandoService.getBandoById(id).subscribe(data => this.bando = data);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}