import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class WorkflowService {
  private apiUrl = 'http://localhost:8080/api/workflows';

  constructor(private http: HttpClient) {}

  getWorkflows(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(this.apiUrl);
  }

  createWorkflow(workflow: Workflow): Observable<Workflow> {
    return this.http.post<Workflow>(this.apiUrl, workflow);
  }

  deleteWorkflow(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
export interface Workflow {
  id?: number;
  name: string;
  tasks?: Task[];
}