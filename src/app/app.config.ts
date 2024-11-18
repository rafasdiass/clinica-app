import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Provedor de Rotas
    provideClientHydration(), // Hidratação do cliente (SSR)
    provideHttpClient(withFetch()), // Provedor de HttpClient com suporte a Fetch API
    provideIonicAngular({ mode: 'ios' }), // Suporte ao Ionic, com o modo 'ios'
  ],
};
