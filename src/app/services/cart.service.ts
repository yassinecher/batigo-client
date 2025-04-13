import { Injectable } from '@angular/core';
import { Produit } from '../back/model/produit.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../back/users/data-access/user.service';
import { tap } from 'rxjs/operators';  // Import tap from rxjs

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'myCart';
  private apiUrl = environment.apiUrl + 'cart';
  
  constructor(private http: HttpClient, private userService: UserService) { }

  // Method to get headers (including Authorization token)
  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Get the cart items from local storage
  getCart(): Produit[] {
    const saved = localStorage.getItem(this.cartKey);
    return saved ? JSON.parse(saved) : [];
  }

  // Add a product to the cart (in localStorage)
  addToCart(product: Produit): void {
    const currentCart = this.getCart();
    currentCart.push(product);
    localStorage.setItem(this.cartKey, JSON.stringify(currentCart));
  }

  // Remove a product from the cart (in localStorage)
  removeFromCart(index: number): void {
    const currentCart = this.getCart();
    currentCart.splice(index, 1);
    localStorage.setItem(this.cartKey, JSON.stringify(currentCart));
  }

  // Clear the cart from localStorage
  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  // Save the cart to the backend
  saveCart(cart: Produit[], projectName: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addCart?projectName=${projectName}`, cart, { headers: this.getHeaders() });
  }

  getSavedProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllCarts`, { headers: this.getHeaders() });
  }
}
