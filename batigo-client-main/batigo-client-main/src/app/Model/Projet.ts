import { Livrable } from "./Livrable";

export enum Etat {
    EN_COURS = 'EN_COURS',
    TERMINE = 'TERMINE',
    ANNULE = 'ANNULE'
}

export class Projet {
    id: number;
    nom: string;
    description: string;
    dateDebut: Date;
    dateFinPrevue: Date;
    budget: number;
    etat: Etat;
    livrables: Livrable[];

    constructor(
        id: number,
        nom: string,
        description: string,
        dateDebut: Date,
        dateFinPrevue: Date,
        budget: number,
        etat: Etat,
        livrables: Livrable[]
    ) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.dateDebut = dateDebut;
        this.dateFinPrevue = dateFinPrevue;
        this.budget = budget;
        this.etat = etat;
        this.livrables = livrables;
    }
}