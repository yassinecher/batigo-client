import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; // Import HttpParams
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../back/users/data-access/user.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
    private apiUrl = environment.apiUrl + 'Commande'; 

  //private apiUrl = environment.apiUrl + 'Commande'; 

  constructor(private http: HttpClient, private userService: UserService) {}

  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch all commandes
  getAllCommandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Allcommande`, { headers: this.getHeaders() });
  }

  // Fetch a commande by ID
  getCommandeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getcommande/${id}`, { headers: this.getHeaders() });
  }

  // Add a new commande
  addCommande(commande: any): Observable<any> {
    if (!commande.orderdate) {
      commande.orderdate = new Date().toISOString().split('T')[0];
    }
    console.log(this.apiUrl + '/addcommande');
    return this.http.post<any>(`${this.apiUrl}/addcommande`, commande, { headers: this.getHeaders() });
  }

  // Update an existing commande
  updateCommande(commande: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modifycommande`, commande, { headers: this.getHeaders() });
  }

  // Delete a commande
  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removecommande/${id}`, { headers: this.getHeaders() });
  }

  // Fetch statistics about commandes
  getCommandeStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics`, { headers: this.getHeaders() });
  }

  // Fetch the total number of commandes
  getCommandesCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count`, { headers: this.getHeaders() });
  }

  // Fetch commandes filtered by priority
  getCommandesByPriority(priority: string): Observable<any[]> {
    const params = new HttpParams().set('priority', priority); // Use HttpParams
    return this.http.get<any[]>(`${this.apiUrl}/by-priority`, { headers: this.getHeaders(), params });
  }
}