import { BlogState } from './reducers/blog.reducer';
import { User } from '../app/models/user.model';

export interface AppState {
  blog: BlogState;
  auth: AuthState;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
