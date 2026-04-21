import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppRootComponent } from './app/app-root.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppRootComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
})
.catch(err => console.error(err));
