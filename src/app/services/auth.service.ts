import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private apiUrl = 'http://localhost:3000';

  constructor(private router: Router, private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}`).pipe(
      map((users) => {
        const user = users[0];
        if (user && user.password === password) {
          // const { password, ...userWithoutPassword } = user;
          return user;
        } else {
          throw new Error('Invalid email or password');
        }
      }),
      catchError((error) => {
        console.error('Error:', error);
        throw new Error('Invalid email or password');
      })
    );
  }
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
