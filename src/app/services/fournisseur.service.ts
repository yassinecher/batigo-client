import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from '../back/model/fournisseur';
import { UserService } from '../back/users/data-access/user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root', 
})
export class FournisseurService {
  private apiUrl = environment.apiUrl + 'api/fournisseur';

  constructor(private http: HttpClient, private userService: UserService) {}
  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  getAllFournisseurs(): Observable<Fournisseur[]> {
    const headers = this.getHeaders();
    return this.http.get<Fournisseur[]>(`${this.apiUrl}`, { headers });
  }

  getFournisseurById(id: number): Observable<Fournisseur> {
    const headers = this.getHeaders();

    return this.http.get<Fournisseur>(
      `${this.apiUrl}/getFournisseurById/${id}`,
      { headers }
    );
  }

  addFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    const headers = this.getHeaders();

    return this.http.post<Fournisseur>(`${this.apiUrl}/add`, fournisseur, {
      headers,
    });
  }

  updateFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    const headers = this.getHeaders();

    return this.http.put<Fournisseur>(
      `${this.apiUrl}/updateFournisseur`,
      fournisseur,
      { headers }
    );
  }

  deleteFournisseur(id: number): Observable<void> {
    const headers = this.getHeaders();

    return this.http.delete<void>(`${this.apiUrl}/deleteFournisseur/${id}`, {
      headers,
    });
  }
}
