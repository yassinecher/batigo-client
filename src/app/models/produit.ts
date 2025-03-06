import { Fournisseur } from "./fournisseur";
export interface Produit {
    id?: number;
    nomP: string;
    description: string;
    reference: string;
    categorie: string;
    fournisseur?: Fournisseur; // Relation ManyToOne avec Fournisseur
  }
  