import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductStatsService {
  private apiUrl = environment.apiUrl + 'api/stats';

  constructor(private http: HttpClient) {}

  // Get total number of products
  getTotalNumberOfProducts(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/produits/total`);
  }

  // Get total quantity of all products
  getTotalQuantityOfAllProducts(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/produits/total-quantity`);
  }

  // Get average product price
  getAverageProductPrice(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/produits/average-price`);
  }

  // Get total sales value (price * quantity)
  getTotalSalesValue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/produits/total-sales`);
  }

  // Get total number of categories
  getTotalNumberOfCategories(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/categories/total`);
  }

  // Get categories with no products
  getCategoriesWithNoProducts(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/categories/no-products`);
  }

  // Get the most popular category based on the number of products
  getMostPopularCategory(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/categories/most-popular`);
  }
}
