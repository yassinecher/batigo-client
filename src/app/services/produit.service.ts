import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private apiUrl = 'http://localhost:8080/api/produits'; // your backend URL

  constructor(private http: HttpClient) {}
  getPaginatedProduits(
    page: number,
    size: number,
    search: string = ''
  ): Observable<any> {
    let params = `?page=${page}&size=${size}`;
    if (search.trim()) {
      params += `&search=${search}`;
    }
    return this.http.get<any>(`${this.apiUrl}${params}`);
  }
  getAllProducts() {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/getProduitById/${id}`);
  }

  addProduit(
    produit: Produit,
    categoryId: number,
    fournisseurId: number
  ): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}`, {
      produit,
      categoryId,
      fournisseurId,
    });
  }

  updateProduit(
    produit: Produit,
    categoryId: number,
    fournisseurId: number
  ): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${produit.id}`, {
      produit,
      categoryId,
      fournisseurId,
    });
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
