import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

// preparando para fazer requisições em apis externas http
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};
export const appConfigWithAnimations: ApplicationConfig = {
  ...appConfig,
  providers: [...appConfig.providers, provideAnimations()]
};