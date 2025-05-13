import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../back/model/projet.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiUrl = 'http://localhost:9090/server/Projet';

  constructor(private http: HttpClient) {}

  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/${id}`);
  }

  createProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiUrl, projet);
  }
createProject1(projetDTO: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, projetDTO);
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
    return this.http.get(`${this.apiUrl}/${id}/pdf`, { responseType: 'blob' });
  }

  getArchivedProjets(): Observable<Projet[]> {
      return this.http.get<Projet[]>(`${this.apiUrl}/archived`);
  }

  getApprovedProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}`); // Ensure URL is correct
  }
  
  // BACK OFFICE: Get all projects (approved & pending)
  getAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/all`);
  }
getAllProjets1(filter: any): Observable<any[]> {
    let params = new HttpParams();
    if (filter.etat) params = params.set('etat', filter.etat);
    if (filter.projetType) params = params.set('projetType', filter.projetType);
    if (filter.archived != null) params = params.set('archived', filter.archived.toString());
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  // BACK OFFICE (Admin Panel): Get only pending projects
  getPendingProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/pending`);
  }

  // Approve a project (Admin Only)
  approveProjet(id: number): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/${id}/approve`, {});
  }

  //get project by name
  getProjetByName(name: string): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/name/${name}`);
  }
  

  //get project by etat
  getProjetByEtat(etat: string): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/etat/${etat}`);
  }
  updateProjetProgress(id: number, progress: number): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/${id}/progress/${progress}`, {});
}

terminateProjet(id: number): Observable<Projet> {
  return this.http.put<Projet>(`${this.apiUrl}/${id}/terminate`, {});
}


}