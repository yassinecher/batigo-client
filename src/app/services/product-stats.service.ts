import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductStatsService {
  private baseUrl = 'http://localhost:8080/api/stats'; // Change this URL to your backend server URL

  constructor(private http: HttpClient) {}

  // Get total number of products
  getTotalNumberOfProducts(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/produits/total`);
  }

  // Get total quantity of all products
  getTotalQuantityOfAllProducts(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/produits/total-quantity`);
  }

  // Get average product price
  getAverageProductPrice(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/produits/average-price`);
  }

  // Get total sales value (price * quantity)
  getTotalSalesValue(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/produits/total-sales`);
  }

  // Get total number of categories
  getTotalNumberOfCategories(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/categories/total`);
  }

  // Get total number of products in a specific category
  getTotalNumberOfProductsPerCategory(categoryId: number): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/categories/total-products?categoryId=${categoryId}`
    );
  }

  // Get categories with no products
  getCategoriesWithNoProducts(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/categories/no-products`);
  }

  // Get the most popular category based on the number of products
  getMostPopularCategory(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/categories/most-popular`);
  }
}
