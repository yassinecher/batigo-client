import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface User {
  token: string;
  email: string;
  name?: string;
}
interface AuthResponse {
  access_token: string;
  refresh_token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = `${environment.apiUrl}api/v1/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, { email, password });
  }

  register(firstname: string,lastname: string, email: string,phoneNumber:string, password: string,gender:string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { firstname,lastname, email,phoneNumber, password,gender });
  }

  // Save user data in localStorage
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get user data from localStorage
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('user');
  }
}
