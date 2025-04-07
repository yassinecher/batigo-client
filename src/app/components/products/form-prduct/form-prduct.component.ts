import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProduitService } from '../../../services/produit.service';
import { Router } from '@angular/router';
import { Produit } from '../../../models/produit';
import { CategoryService } from '../../../services/category.service';
import { CategoryProduct } from '../../../models/category';
import { Fournisseur } from '../../../models/fournisseur';
import { FournisseurService } from '../../../services/fournisseur.service';

@Component({
  selector: 'app-form-prduct',
  templateUrl: './form-prduct.component.html',
  styleUrls: ['./form-prduct.component.scss'],
})
export class FormPrductComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter();
  @Input() selectedProduct: Produit | null = null;
  produit: Produit = {
    id: 0,
    nomP: '',
    description: '',
    reference: '',
    categorieId: 0,
    fournisseurId: 0,
    quantity: 0,
    price: 0,
    imageBase64: '', // Add this line
  };
  categories: CategoryProduct[] = [];
  fournisseurs: Fournisseur[] = [];
  constructor(
    private produitsService: ProduitService,
    private categoryService: CategoryService,
    private fournisseurService: FournisseurService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((data) => (this.categories = data));
    this.fournisseurService
      .getAllFournisseurs()
      .subscribe((data) => (this.fournisseurs = data));

    // Pre-fill form if editing
    if (this.selectedProduct) {
      this.produit = {
        ...this.selectedProduct,
        categorieId: this.selectedProduct.categorie?.id || 0,
        fournisseurId: this.selectedProduct.fournisseur?.idF || 0,
      };
    }
  }

  saveProduit(): void {
    if (this.selectedProduct) {
      // Update mode
      this.produitsService
        .updateProduit(
          this.produit,
          Number(this.produit.categorieId),
          Number(this.produit.fournisseurId)
        )
        .subscribe(() => this.formSubmitted.emit());
    } else {
      // Add mode
      this.produitsService
        .addProduit(
          this.produit,
          Number(this.produit.categorieId),
          Number(this.produit.fournisseurId)
        )
        .subscribe(() => this.formSubmitted.emit());
    }
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.produit.imageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
