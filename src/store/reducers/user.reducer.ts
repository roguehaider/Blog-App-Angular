import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../app.state';
import * as AuthActions from '../actions/user.action';

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user: user,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    loading: false,
    error,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    isLoggedIn: false,
    user: null,
  })),

  on(AuthActions.logoutSuccess, () => ({
    user: null,
    loading: false,
    error: null,
  })),

  on(AuthActions.signup, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.signupSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.editProfileSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    error: null,
  })),
  on(AuthActions.editProfileFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(AuthActions.updatePasswordSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    error: null,
  })),
  on(AuthActions.updatePasswordFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
