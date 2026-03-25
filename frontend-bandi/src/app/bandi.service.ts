import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bando } from './bando.interface';

@Injectable({
  providedIn: 'root'
})
export class BandiService {
  
  // URL backend reale (avvia backend con npm run start nel progetto backend-bandi)
  private apiUrl = 'http://localhost:3000/api/bandi';

  constructor(private http: HttpClient) { }

  getBandi(params: { search?: string; stato?: string; page?: number; sort?: 'asc' | 'desc' } = {}): Observable<{ total: number; page: number; limit: number; data: Bando[] }> {
    const queryParams: Record<string, string> = {};

    if (params.search) queryParams['search'] = params.search;
    if (params.stato) queryParams['stato'] = params.stato;
    if (params.page) queryParams['page'] = String(params.page);

    // backend gestisce paginazione; la sort locale è applicata in frontend
    return this.http.get<{ total: number; page: number; limit: number; data: Bando[] }>(this.apiUrl, {
      params: queryParams,
    });
  }
}