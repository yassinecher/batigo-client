import { Produit } from "./produit";
export interface Fournisseur {
    idF?: number;
    nom:string;
    adresse: string;
    email: string;
    tel: string;
    matricule: string;
    date_creation: Date;
    statut: string;
    produits?: Produit[]; 
  }
  