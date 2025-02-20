import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from 'src/app/Model/Projet';

@Injectable({
    providedIn: 'root'
})
export class ProjetService {
    private apiUrl = 'http://localhost:8089/api/projets';

    constructor(private http: HttpClient) {}

    creerProjet(projet: Projet): Observable<Projet> {
        return this.http.post<Projet>(`${this.apiUrl}/creer`, projet);
    }

    listerProjets(): Observable<Projet[]> {
        return this.http.get<Projet[]>(`${this.apiUrl}/lister`);
    }

    obtenirProjetParId(id: number): Observable<Projet> {
        return this.http.get<Projet>(`${this.apiUrl}/obtenir/${id}`);
    }

    mettreAJourProjet(id: number, projet: Projet): Observable<Projet> {
        return this.http.put<Projet>(`${this.apiUrl}/mettreAJour/${id}`, projet);
    }

    supprimerProjet(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`);
    }
}