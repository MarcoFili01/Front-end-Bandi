import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Bando } from './bando.interface';
import { BandiService } from './bandi.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(
    private bandiService: BandiService,
    private cdr: ChangeDetectorRef // Forza l'aggiornamento della grafica
  ) {}

  ngOnInit(): void {
    this.caricaBandi();
  }

  /**
   * Calcola i numeri di pagina in modo sicuro per evitare loop infiniti
   */
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

  /**
   * Metodo principale per recuperare i dati dal server
   */
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

        // 1. Spegniamo il caricamento IMMEDIATAMENTE
        this.isLoading = false;

        if (!resp) return;

        // 2. Mappatura dati sicura
        const nuoviBandi = resp.data || [];
        this.total = Number(resp.total) || 0;
        this.limit = Number(resp.limit) || 5;
        this.page = Number(resp.page) || this.page;

        // 3. Pulizia tag (rimuove spazi bianchi)
        nuoviBandi.forEach((b: any) => {
          if (b && Array.isArray(b.tags)) {
            b.tags = b.tags.map((t: any) => (typeof t === 'string' ? t.trim() : t));
          }
        });

        this.bandi = nuoviBandi;

        // 4. Ordinamento protetto
        try {
          this.applicaOrdinamento();
        } catch (e) {
          console.error("Errore ordinamento:", e);
        }

        // 5. Comunichiamo ad Angular di ridisegnare la pagina ora
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

  /**
   * Ordina i bandi in base alla data di chiusura
   */
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

  // --- Metodi per l'interfaccia ---

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
}