import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private apiUrl = 'http://localhost:9090/incidents';

  constructor(private http: HttpClient) {}

  // 🔹 Récupérer tous les incidents
  getAllIncidents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🔹 Récupérer un seul incident par ID
  getIncidentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Ajouter un nouvel incident
  createIncident(incident: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, incident);
  }

  // 🔹 Modifier un incident
  updateIncident(id: number, incident: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, incident);
  }

  // 🔹 Supprimer un incident
  deleteIncident(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Exporter les incidents en Excel
  exportIncidentsAsExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/excel`, {
      responseType: 'blob' // on attend un fichier binaire
    });
  }
}
