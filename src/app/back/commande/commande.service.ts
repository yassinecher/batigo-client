import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../users/data-access/user.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = environment.apiUrl + 'Commande';

  constructor(private http: HttpClient, private userService: UserService) {}

  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllCommandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Allcommande`, { headers: this.getHeaders() });
  }

  getCommandeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getcommande/${id}`, { headers: this.getHeaders() });
  }

  addCommande(commande: any): Observable<any> {
    if (!commande.orderdate) {
      commande.orderdate = new Date().toISOString().split('T')[0];
    }
    return this.http.post<any>(`${this.apiUrl}/addcommande`, commande, { headers: this.getHeaders() });
  }

  updateCommande(commande: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modifycommande`, commande, { headers: this.getHeaders() });
  }

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removecommande/${id}`, { headers: this.getHeaders() });
  }
}
