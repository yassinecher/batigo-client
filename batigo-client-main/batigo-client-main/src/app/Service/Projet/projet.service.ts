import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from 'src/app/Model/projet.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
    private apiUrl = 'http://localhost:8089/api/projets';

    constructor(private http: HttpClient) {}
  
    getProjetById(id: number): Observable<Projet> {
      return this.http.get<Projet>(`${this.apiUrl}/${id}`);
    }
  
    createProjet(projet: Projet): Observable<Projet> {
      return this.http.post<Projet>(this.apiUrl, projet);
    }
  
    updateProjet(projet: Projet): Observable<Projet> {
        return this.http.put<Projet>(`${this.apiUrl}/${projet.id}`, projet, {
          headers: { 'Content-Type': 'application/json' }
        });
    }
  
    archiveProjet(id: number): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}/${id}/archive`, {});
    }
  
    unarchiveProjet(id: number): Observable<Projet> {
      return this.http.put<Projet>(`${this.apiUrl}/${id}/unarchive`, {});
    }
  
    downloadProjetPdf(id: number): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/${id}/download-pdf`, { responseType: 'blob' });
    }

    getArchivedProjets(): Observable<Projet[]> {
        return this.http.get<Projet[]>(`${this.apiUrl}/archived`);
    }

    // FRONT OFFICE: Get only approved projects
    getApprovedProjets(): Observable<Projet[]> {
      return this.http.get<Projet[]>(this.apiUrl);
    }

    // BACK OFFICE: Get all projects (approved & pending)
    getAllProjets(): Observable<Projet[]> {
      return this.http.get<Projet[]>(`${this.apiUrl}/all`);
    }

    // BACK OFFICE (Admin Panel): Get only pending projects
    getPendingProjets(): Observable<Projet[]> {
      return this.http.get<Projet[]>(`${this.apiUrl}/pending`);
    }

    // Approve a project (Admin Only)
    approveProjet(id: number): Observable<Projet> {
      return this.http.put<Projet>(`${this.apiUrl}/${id}/approve`, {});
    }
}