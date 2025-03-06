import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from '../models/fournisseur';


@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private apiUrl = 'http://localhost:8090/batigo/fournisseur';


  constructor(private http: HttpClient) {

  }

  getAllFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.apiUrl}/getAllFournisseurs`);
  }

  getFournisseurById(id: number): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.apiUrl}/getFournisseurById/${id}`);
  }

  addFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(`${this.apiUrl}/addFournisseur`, fournisseur);
  }

  updateFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.apiUrl}/updateFournisseur`, fournisseur);
  }

  deleteFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteFournisseur/${id}`);
  }
  
}
