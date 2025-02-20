import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livrable } from 'src/app/Model/Livrable';

@Injectable({
    providedIn: 'root'
})
export class LivrableService {
    private apiUrl = 'http://localhost:8089/api/livrables';

    constructor(private http: HttpClient) {}

    creerLivrable(livrable: Livrable): Observable<Livrable> {
        return this.http.post<Livrable>(`${this.apiUrl}/creer`, livrable);
    }

    listerLivrables(): Observable<Livrable[]> {
        return this.http.get<Livrable[]>(`${this.apiUrl}/lister`);
    }

    obtenirLivrableParId(id: number): Observable<Livrable> {
        return this.http.get<Livrable>(`${this.apiUrl}/obtenir/${id}`);
    }

    supprimerLivrable(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`);
    }
}