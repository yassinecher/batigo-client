import { CategoryProduct } from './category';
import { Fournisseur } from './fournisseur';
export interface Produit {
  id?: number;
  nomP: string;
  description: string;
  reference: string;
  categorie?: CategoryProduct;
  categorieId?: number;
  fournisseurId: number;
  fournisseur?: Fournisseur;
  quantity: number;
  price: number;
  imageBase64: string;
}
