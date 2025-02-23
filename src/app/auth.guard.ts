import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivityService } from './services/activity.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private activityService: ActivityService
  ) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    this.activityService.initializeInactivityTimer();
    return true;
  }
}
