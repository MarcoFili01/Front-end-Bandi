import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importato per le chiamate API

import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule
  ]
});