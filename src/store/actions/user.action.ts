import { createAction, props } from '@ngrx/store';
import { User } from '../../app/models/user.model';

//Login Action
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

//Logout Action

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

//SignUp Action

export const signup = createAction(
  '[Auth] Signup',
  props<{ userData: Omit<User, 'id'> }>()
);
export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: User }>()
);
export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: any }>()
);

export const editProfile = createAction(
  '[User] Edit Profile',
  props<{ userId: string; userData: any }>()
);

export const editProfileSuccess = createAction(
  '[User] Edit Profile Success',
  props<{ user: any }>()
);

export const editProfileFailure = createAction(
  '[User] Edit Profile Failure',
  props<{ error: any }>()
);

export const updatePassword = createAction(
  '[User] Update Password',
  props<{ userId: string; updatedUserData: any }>()
);

export const updatePasswordSuccess = createAction(
  '[User] Update Password Success',
  props<{ user: any }>()
);

export const updatePasswordFailure = createAction(
  '[User] Update Password Failure',
  props<{ error: any }>()
);
