import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BandoDetailComponent } from './bando-detail/bando-detail';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full'
  },
  {
    path: 'bando/:id',
    component: BandoDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
