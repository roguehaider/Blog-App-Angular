import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from '../../store/actions/user.action';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private inactivityTimer: any;
  private inactivityDuration = 500000;

  constructor(
    private store: Store,
    private router: Router,
    private ngZone: NgZone
  ) {}

  initializeInactivityTimer() {
    this.resetInactivityTimer();
    this.addActivityListeners();
  }

  private resetInactivityTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
    this.ngZone.runOutsideAngular(() => {
      this.inactivityTimer = setTimeout(() => {
        this.ngZone.run(() => this.logout());
      }, this.inactivityDuration);
    });
  }

  private addActivityListeners() {
    ['click', 'mousemove', 'keypress'].forEach((eventName) => {
      document.addEventListener(eventName, () => this.resetInactivityTimer(), {
        passive: true,
      });
    });
  }

  private logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
