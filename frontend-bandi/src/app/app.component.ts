import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Bando } from './bando.interface';
import { BandiService } from './bandi.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FiltroItem {
  label: string;
  isOpen: boolean;
  options: { label: string; selected: boolean }[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bandi: Bando[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  searchTerm: string = '';
  activeStatus: '' | 'Attivo' | 'In arrivo' | 'Chiuso' = '';
  page: number = 1;
  total: number = 0;
  limit: number = 5;
  sortOrder: 'asc' | 'desc' = 'desc';

  // LOGICA FILTRI AGGIUNTA - PULITA COME RICHIESTO
  filtriList: FiltroItem[] = [
    {
      label: 'TIPO SOGGETTO',
      isOpen: false,
      options: [
        { label: 'IMPRESA', selected: false },
        { label: 'ISTITUTO FINANZIARIO', selected: false },
        { label: 'IMPRESA - PREVALENZA FEMMINILE', selected: false },
        { label: 'IMPRESA - PREVALENZA GIOVANILE', selected: false },
        { label: 'IMPRESA - SU/PMI INNOVATIVA', selected: false },
        { label: 'IMPRESA DA COSTITUIRE - FEMMINILE', selected: false },
        { label: 'IMPRESA DA COSTITUIRE - GIOVANILE', selected: false },
        { label: 'IMPRESA DA COSTITUIRE - ALTRO', selected: false },
        { label: 'PROFESSIONISTA', selected: false },
        { label: 'ASSOCIAZIONE FRA PROFESSIONISTI', selected: false },
        { label: 'RETE D\'IMPRESA', selected: false },
        { label: 'COOPERATIVE/ASSOCIAZIONI NON PROFIT', selected: false },
        { label: 'CONSORZIO', selected: false },
        { label: 'ENTE PUBBLICO', selected: false },
        { label: 'UNIVERSITÀ ENTE DI RICERCA', selected: false }
      ]
    },
    { label: 'DIMENSIONE', isOpen: false, options: [] },
    { label: 'FORMA AGEVOLAZIONE', isOpen: false, options: [] },
    { label: 'REGIONE', isOpen: false, options: [] },
    { label: 'AMBITO TERRITORIALE SPECIALE', isOpen: false, options: [] },
    { label: 'OBIETTIVO FINALITÀ', isOpen: false, options: [] },
    { label: 'COSTI AMMESSI', isOpen: false, options: [] }
  ];

  constructor(
    private bandiService: BandiService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.caricaBandi();
  }

  toggleFilter(filtro: FiltroItem): void {
    filtro.isOpen = !filtro.isOpen;
  }

  // NUOVA FUNZIONE PER IL CONTATORE DEI FILTRI
  getSelectedCount(filtro: FiltroItem): number {
    if (!filtro.options) return 0;
    return filtro.options.filter(opt => opt.selected).length;
  }

  get visiblePages(): number[] {
    const sicurezzaLimit = this.limit > 0 ? this.limit : 5;
    const totalPages = Math.ceil(this.total / sicurezzaLimit) || 1;
    const pages: number[] = [];
    const maxVisible = 3; 
    
    let start = Math.max(1, this.page);
    if (start > totalPages - maxVisible + 1 && totalPages > maxVisible) {
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    for (let i = 0; i < maxVisible; i++) {
      if (start <= totalPages) {
        pages.push(start);
        start++;
      }
    }
    return pages;
  }

  caricaBandi(page: any = 1): void {
    this.page = Number(page) || 1;
    this.isLoading = true;
    this.errorMessage = '';

    console.log('Richiesta dati per pagina:', this.page);

    this.bandiService.getBandi({
      search: this.searchTerm,
      stato: this.activeStatus || undefined,
      page: this.page,
      sort: this.sortOrder,
    }).subscribe({
      next: (resp: any) => {
        console.log('Dati ricevuti con successo:', resp);
        this.isLoading = false;
        if (!resp) return;

        const nuoviBandi = resp.data || [];
        this.total = Number(resp.total) || 0;
        this.limit = Number(resp.limit) || 5;
        this.page = Number(resp.page) || this.page;

        nuoviBandi.forEach((b: any) => {
          if (b && Array.isArray(b.tags)) {
            b.tags = b.tags.map((t: any) => (typeof t === 'string' ? t.trim() : t));
          }
        });

        this.bandi = nuoviBandi;

        try {
          this.applicaOrdinamento();
        } catch (e) {
          console.error("Errore ordinamento:", e);
        }

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Errore durante la chiamata API:', error);
        this.errorMessage = 'Errore di connessione al server.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applicaOrdinamento(): void {
    if (!Array.isArray(this.bandi) || this.bandi.length === 0) return;

    this.bandi = [...this.bandi].sort((a, b) => {
      const dateA = a?.closingDate ? new Date(a.closingDate).getTime() : 0;
      const dateB = b?.closingDate ? new Date(b.closingDate).getTime() : 0;
      const valA = isNaN(dateA) ? 0 : dateA;
      const valB = isNaN(dateB) ? 0 : dateB;
      return this.sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }

  cambiaStato(stato: any): void {
    this.activeStatus = stato;
    this.caricaBandi(1);
  }

  cerca(): void {
    this.caricaBandi(1);
  }

  cambiaOrdine(ord: 'asc' | 'desc'): void {
    this.sortOrder = ord;
    this.applicaOrdinamento();
    this.cdr.detectChanges();
  }

  paginaAvanti(): void {
    if (this.page * this.limit < this.total) {
      this.caricaBandi(this.page + 1);
    }
  }

  paginaIndietro(): void {
    if (this.page > 1) {
      this.caricaBandi(this.page - 1);
    }
  }

  goToBandoDetail(bando: Bando): void {
    this.router.navigate(['/bando', bando.id]);
  }
}