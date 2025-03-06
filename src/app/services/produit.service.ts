import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://localhost:8090/batigo/produit';

  constructor(private http: HttpClient) {}

  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/getAllProduits`);
  }

  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/getProduitById/${id}`);
  }

  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}/addProduit`, produit);
  }

  updateProduit(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/updateProduit`, produit);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteProduit/${id}`);
  }
}
