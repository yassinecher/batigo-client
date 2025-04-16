import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspectionsService {

  private apiUrl = 'http://localhost:8080/inspections';
  private enumUrl = 'http://localhost:8080/api/enums/resultats-inspection';

  constructor(private http: HttpClient) {}

  // 🔹 Récupérer toutes les inspections
  getAllInspections(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🔹 Récupérer une inspection par ID
  getInspectionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Récupérer les inspections d’un incident
  getInspectionsByIncidentId(incidentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/incidents/${incidentId}/inspections`);
  }

  // 🔹 Ajouter une inspection
  createInspection(incidentId: number, inspection: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create/${incidentId}`, inspection);
  }

  // 🔹 Modifier une inspection
  updateInspection(id: number, inspection: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, inspection);
  }

  // 🔹 Supprimer une inspection
  deleteInspection(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Charger les résultats d’inspection depuis l’enum
  getResultatOptions(): Observable<{ value: string, label: string }[]> {
    return this.http.get<{ value: string, label: string }[]>(this.enumUrl);
  }
}
