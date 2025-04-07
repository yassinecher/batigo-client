import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryProduct } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories'; // your backend URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryProduct[]> {
    return this.http.get<CategoryProduct[]>(this.apiUrl);
  }

  getById(id: number): Observable<CategoryProduct> {
    return this.http.get<CategoryProduct>(`${this.apiUrl}/${id}`);
  }

  create(category: CategoryProduct): Observable<CategoryProduct> {
    return this.http.post<CategoryProduct>(this.apiUrl, category);
  }

  update(id: number, category: CategoryProduct): Observable<CategoryProduct> {
    return this.http.put<CategoryProduct>(`${this.apiUrl}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
