import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { blogReducer } from './reducers/blog.reducer';
import { authReducer } from '../store/reducers/user.reducer';
import { BlogEffects } from './effects/blog.effects';
import { AuthEffects } from './effects/user.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({ blogs: blogReducer, auth: authReducer }),
    EffectsModule.forRoot([BlogEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
})
export class AppStoreModule {}
