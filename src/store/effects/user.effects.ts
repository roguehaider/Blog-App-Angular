import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../app/services/auth.service';
import * as AuthActions from '../../store/actions/user.action';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../app/services/user.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivityService } from '../../app/services/activity.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private userService: UserService,
    private store: Store<AppState>,
    private activityService: ActivityService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userId', user.id);
          localStorage.setItem('user', JSON.stringify(user));
          Swal.fire('Success', 'Login SuccesSful', 'success');
          this.router.navigate(['category/all-blogs']).then(() => {
            this.location.replaceState('category/all-blogs');
          });
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          console.error('Login failed:', error);
          Swal.fire('Error', 'Invalid Email or Password! Try Again.', 'error');
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('TOKEN_KEY');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.setItem('isLoggedIn', 'false');
        this.router.navigate(['/login']);

        if (this.activityService['inactivityTimer']) {
          clearTimeout(this.activityService['inactivityTimer']);
        }
      }),
      map(() => AuthActions.logoutSuccess())
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(({ userData }) =>
        this.userService.checkEmailExists(userData.email).pipe(
          switchMap((users) => {
            if (users.length > 0) {
              return of(
                AuthActions.signupFailure({
                  error: 'User with this email already exists',
                })
              );
            }
            return this.userService.signup(userData).pipe(
              map((user) => AuthActions.signupSuccess({ user })),
              catchError((error) =>
                of(
                  AuthActions.signupFailure({
                    error: 'An error occurred. Please try again later.',
                  })
                )
              )
            );
          }),
          catchError((error) =>
            of(
              AuthActions.signupFailure({
                error: 'An error occurred. Please try again later.',
              })
            )
          )
        )
      )
    )
  );
  editProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.editProfile),
      switchMap(({ userId, userData }) =>
        this.userService.checkEmailExists(userData.email).pipe(
          switchMap((users) => {
            const existingUser = users.find((user) => user.id !== userId);
            if (existingUser) {
              return of(
                AuthActions.editProfileFailure({
                  error: 'Email already exists',
                })
              );
            }
            return this.userService.editProfile(userId, userData).pipe(
              map((user) => AuthActions.editProfileSuccess({ user })),
              catchError((error) =>
                of(
                  AuthActions.editProfileFailure({
                    error: 'An error occurred. Please try again later.',
                  })
                )
              )
            );
          }),
          catchError((error) =>
            of(
              AuthActions.editProfileFailure({
                error: 'An error occurred. Please try again later.',
              })
            )
          )
        )
      )
    )
  );

  // getCurrentUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.getCurrentUser),
  //     switchMap(() =>
  //       this.userService.getCurrentUser().pipe(
  //         map(user => AuthActions.getCurrentUserSuccess({ user })),
  //         catchError(error => of(AuthActions.getCurrentUserFailure({ error: 'User not authenticated' })))
  //       )
  //     )
  //   )
  // );

  updatePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updatePassword),
      switchMap(({ userId, updatedUserData }) =>
        this.userService.updatePassword(userId, updatedUserData).pipe(
          map((user) => AuthActions.updatePasswordSuccess({ user })),
          catchError((error) =>
            of(
              AuthActions.updatePasswordFailure({
                error: 'An error occurred. Please try again later.',
              })
            )
          )
        )
      )
    )
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap(() => {
          Swal.fire('Success', 'User Created successfully!', 'success');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  signupFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupFailure),
        tap(({ error }) => {
          console.error('Signup failed:', error);
          Swal.fire('Error', error, 'error');
        })
      ),
    { dispatch: false }
  );

  // editProfile$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.editProfile),
  //     mergeMap(({ userId, userData }) =>
  //       this.userService.editProfile(userId, userData).pipe(
  //         map(user => AuthActions.editProfileSuccess({ user })),
  //         catchError(error => of(AuthActions.editProfileFailure({ error })))
  //       )
  //     )
  //   )
  // );

  editProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.editProfileSuccess),
        tap(() => {
          Swal.fire('Success', 'Profile Updated successfully!', 'success');
        })
      ),
    { dispatch: false }
  );

  editProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.editProfileFailure),
        tap(({ error }) => {
          if (error === 'Email already exists') {
            Swal.fire('Error', 'Email already exists', 'error');
          } else {
            Swal.fire('Error', 'Error updating profile', 'error');
          }
        })
      ),
    { dispatch: false }
  );

  // updatePassword$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.updatePassword),
  //     mergeMap(({ userId, updatedUserData }) =>
  //       this.userService.updatePassword(userId, updatedUserData).pipe(
  //         map(user => AuthActions.updatePasswordSuccess({ user })),
  //         catchError(error => of(AuthActions.updatePasswordFailure({ error })))
  //       )
  //     )
  //   )
  // );

  updatePasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updatePasswordSuccess),
        tap(() => {
          Swal.fire({
            title: 'Success',
            text: 'Password updated successfully! Please sign in again with your new password.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              // Dispatch logout action
              this.store.dispatch(AuthActions.logout());
            }
          });
        })
      ),
    { dispatch: false }
  );

  updatePasswordFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updatePasswordFailure),
        tap(({ error }) => {
          Swal.fire('Error', 'Error updating password!', 'error');
        })
      ),
    { dispatch: false }
  );
}
