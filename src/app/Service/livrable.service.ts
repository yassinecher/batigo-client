import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livrable, Statut } from '../back/model/livrable.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LivrableService {

  private apiUrl = 'http://localhost:9090/api/livrables'; // Backend API URL

  constructor(private http: HttpClient) {}

  getLivrables(): Observable<Livrable[]> {
    return this.http.get<Livrable[]>(`${this.apiUrl}/all`); 
  }

  getLivrableById(id: number): Observable<Livrable> {
    return this.http.get<Livrable>(`${this.apiUrl}/${id}`);
  }

  getLivrablesByProjetId(projetId: number): Observable<Livrable[]> {
    return this.http.get<Livrable[]>(`${this.apiUrl}/projet/${projetId}`);
  }

  createLivrable(livrable: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, livrable, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
 
  
  updateLivrable(livrable: Livrable): Observable<Livrable> {
    return this.http.put<Livrable>(`${this.apiUrl}/${livrable.id}`, livrable, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  updateLivrableStatus(id: number, statut: Statut): Observable<Livrable> {
    return this.http.put<Livrable>(`${this.apiUrl}/${id}/status`, { statut });
  }
  

  deleteLivrable(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
