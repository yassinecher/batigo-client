import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produit';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-products-client',
  templateUrl: './products-client.component.html',
  styleUrls: ['./products-client.component.scss'],
})
export class ProductsClientComponent implements OnInit {
  products: Produit[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 5;
  searchTerm = '';
  totalItems = 0;

  constructor(private productService: ProduitService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService
      .getPaginatedProduits(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe((data) => {
        this.products = data.content; // Assuming 'content' is the array of products
        this.totalItems = data.totalElements; // Total number of products
        this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Calculate total pages
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  get totalPagesArray(): number[] {
    // Generate an array with numbers from 0 to totalPages - 1
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }
}
