import { Projet } from "./projet.model";

export enum Statut {
    EN_ATTENTE = 'EN_ATTENTE',
    EN_COURS = 'EN_COURS',
    TERMINE = 'TERMINE',
    VALIDE = 'VALIDE',
    REJETE = 'REJETE'
  }
  
  export interface Livrable {
    id: number;
    nom: string;
    type: string;
    responsable: string;
    statut: Statut;
    dateRemisePrevue: string;
    dateRemiseReelle?: string;
    commentaire?: string;
    projetId: number;
    projet?: Projet; // Foreign key project
    overdue?: boolean;  
  }
  