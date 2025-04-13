import { Component } from '@angular/core';
import { Produit } from '../model/produit.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent {
constructor(private cartService: CartService) {}

addToCart(produit: Produit) {
  this.cartService.addToCart(produit);
}

  products: Produit[] = [
    { name: 'Hammer', image: 'assets/img/portfolio-1.jpg', location: 'Warehouse A' },
    { name: 'Glass', image: 'assets/img/portfolio-2.jpg', location: 'Warehouse B' },
    { name: 'Wood', image: 'assets/img/portfolio-3.jpg', location: 'Warehouse C' },
    { name: 'Brick', image: 'assets/img/portfolio-4.jpg', location: 'Warehouse D' },
    { name: 'Steel', image: 'assets/img/portfolio-5.jpg', location: 'Warehouse E' },
    { name: 'Aluminum', image: 'assets/img/portfolio-6.jpg', location: 'Warehouse F' }
  ];
}
