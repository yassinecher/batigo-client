import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Produit } from '../model/produit';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart: Produit[] = [];
  projectName: string = ''; // Variable to store the project name
  savedProjects: any[] = []; // To store all the saved carts

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
    this.cartService.getSavedProjects().subscribe(
      (response) => {
        this.savedProjects = response;
        console.log('Saved projects:', this.savedProjects);
      },
      (error) => {
        console.error('Error fetching saved projects:', error);
      }
    );
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
    this.cart = this.cartService.getCart(); // Refresh
  }
  confirmCart() {
    console.log('Cart confirmed:', this.cart);
    this.cartService.saveCart(this.cart, this.projectName).subscribe(
      (response) => {
        console.log('Cart saved successfully:', response);
        this.clearCart();
        this.projectName = '';
        this.cart = []; // Clear the cart after saving
      },
      (error) => {
        console.error('Error saving cart:', error);
        // Handle error (e.g., show a message to the user)
      }
    );
  }

  clearCart() {
    this.cartService.clearCart();
    this.cart = [];
  }
}
