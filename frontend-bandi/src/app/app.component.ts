import { Component, OnInit } from '@angular/core';
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

  constructor(private bandiService: BandiService) {}

  ngOnInit(): void {
    this.caricaBandi();
  }

  /**
   * Getter per calcolare i numeri di pagina visibili nella paginazione.
   * Mostra la pagina corrente e le due successive, se disponibili.
   */
  get visiblePages(): number[] {
    const totalPages = Math.ceil(this.total / this.limit);
    const pages: number[] = [];
    const maxVisible = 3; // Numero di pulsanti numerici da mostrare
    
    for (let i = 0; i < maxVisible; i++) {
      const p = this.page + i;
      if (p <= totalPages) {
        pages.push(p);
      }
    }
    return pages;
  }

  caricaBandi(page: number = 1): void {
    this.page = page;
    this.isLoading = true;
    this.errorMessage = '';

    this.bandiService.getBandi({
      search: this.searchTerm,
      stato: this.activeStatus || undefined,
      page: this.page,
      sort: this.sortOrder,
    }).subscribe({
      next: (resp) => {
        this.bandi = resp.data;
        this.total = resp.total;
        this.limit = resp.limit;
        this.page = resp.page;

        this.applicaOrdinamento();

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Errore nel recupero dei bandi:', error);
        this.errorMessage = 'Si è verificato un errore nel caricamento dei bandi. Riprova più tardi.';
        this.isLoading = false;
      }
    });
  }

  applicaOrdinamento(): void {
    this.bandi = [...this.bandi].sort((a, b) => {
      const fa = new Date(a.closingDate).getTime();
      const fb = new Date(b.closingDate).getTime();
      return this.sortOrder === 'asc' ? fa - fb : fb - fa;
    });
  }

  cambiaStato(stato: 'Attivo' | 'In arrivo' | 'Chiuso' | ''): void {
    this.activeStatus = stato;
    this.caricaBandi(1);
  }

  cerca(): void {
    this.caricaBandi(1);
  }

  cambiaOrdine(ord: 'asc' | 'desc'): void {
    this.sortOrder = ord;
    this.applicaOrdinamento();
  }

  paginaAvanti(): void {
    if (this.page * this.limit >= this.total) return;
    this.caricaBandi(this.page + 1);
  }

  paginaIndietro(): void {
    if (this.page <= 1) return;
    this.caricaBandi(this.page - 1);
  }
}