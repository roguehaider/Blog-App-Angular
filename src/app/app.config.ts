import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { blogReducer } from '../store/reducers/blog.reducer';
import { BlogEffects } from '../store/effects/blog.effects';
import { authReducer } from '../store/reducers/user.reducer';
import { AuthEffects } from '../store/effects/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({ blog: blogReducer, auth: authReducer }),
    provideEffects([BlogEffects, AuthEffects]),
  ],
};
