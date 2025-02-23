import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, userData);
  }

  checkEmailExists(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}`);
  }

  editProfile(userId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, userData);
  }

  getCurrentUser(): Observable<any> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
    } else {
      throw new Error('User not authenticated');
    }
  }

  updatePassword(userId: string, updatedUserData: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/users/${userId}`,
      updatedUserData
    );
  }
}
