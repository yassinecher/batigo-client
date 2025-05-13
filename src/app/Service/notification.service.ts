import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:9090/notifications'; // à adapter si besoin

  constructor(private http: HttpClient) {}

  // Récupérer toutes les notifications
  getNotifications(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}`);
  }
}
