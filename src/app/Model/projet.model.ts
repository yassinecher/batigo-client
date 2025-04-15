export enum Etat {
    EN_COURS = 'EN_COURS',
    TERMINE = 'TERMINE',
    ANNULE = 'ANNULE'
  }
  
  export interface Projet {
    id: number; 
    nom: string;
    description: string;
    dateDebut: string; 
    dateFinPrevue: string;
    dateFinReelle: string; 
    budget: number;
    etat: Etat;
    responsable: string; 
    archived: boolean;
    approved: boolean;
    progress: number; //
    lastUpdated: string; // ✅ Track when progress was last updated
    scheduleStatus?: string; // ✅ Show if it's behind, on track, or ahead
    terminated?: boolean;
  }
  