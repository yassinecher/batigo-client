import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  token: string;
  email: string;
  name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'https://your-api-url'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, { name, email, password });
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
