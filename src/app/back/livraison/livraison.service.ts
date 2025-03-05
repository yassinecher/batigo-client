import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../users/data-access/user.service';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
 
  private baseUrl = environment.apiUrl + 'Livraison';

  constructor(private http: HttpClient, private userService: UserService) {}

  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Get all livraisons
  getAllLivraisons(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/AllLivraison`, { headers: this.getHeaders() });
  }

  // Get a livraison by ID
  getLivraisonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getlivraison/${id}`, { headers: this.getHeaders() });
  }

  // Add a new livraison
  addLivraison(livraison: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addlivraison`, livraison, { headers: this.getHeaders() });
  }

  // Modify an existing livraison
  modifyLivraison(livraison: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifylivraison`, livraison, { headers: this.getHeaders() });
  }

  // Delete a livraison
  deleteLivraison(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/removelivraison/${id}`, { headers: this.getHeaders() });
  }

  // Get all commandes (for dropdown selection)
  getAllCommandes(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}Commande/Allcommande`, { headers: this.getHeaders() });
  }
}
