export enum Statut {
    EN_COURS = 'EN_COURS',
    TERMINE = 'TERMINE',
    ANNULE = 'ANNULE'
}

export class Livrable {
    id: number;
    nom: string;
    type: string;
    statut: Statut;
    dateRemisePrevue: Date;
    dateRemiseReelle: Date;
    commentaire: string;
    projetId: number;

    constructor(
        id: number,
        nom: string,
        type: string,
        statut: Statut,
        dateRemisePrevue: Date,
        dateRemiseReelle: Date,
        commentaire: string,
        projetId: number
    ) {
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.statut = statut;
        this.dateRemisePrevue = dateRemisePrevue;
        this.dateRemiseReelle = dateRemiseReelle;
        this.commentaire = commentaire;
        this.projetId = projetId;
    }
}