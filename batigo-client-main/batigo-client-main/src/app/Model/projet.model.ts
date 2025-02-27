export enum Etat {
    EN_COURS = 'EN_COURS',
    TERMINE = 'TERMINE',
    ANNULE = 'ANNULE'
  }
  
  export interface Projet {
    id?: number; 
    nom: string;
    description: string;
    dateDebut: string; // ISO format string (YYYY-MM-DD)
    dateFinPrevue: string;
    dateFinReelle?: string; 
    budget: number;
    etat: Etat;
    responsable: string; 
    archived: boolean;
    approved: boolean; 
  }
  