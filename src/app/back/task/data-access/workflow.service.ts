import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class WorkflowService {
  private apiUrl = 'http://localhost:9090/server/api/workflows';

  constructor(private http: HttpClient) {}

  getWorkflows(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(this.apiUrl);
  }

  createWorkflow(workflow: Workflow): Observable<any> {
    return this.http.post<any>(this.apiUrl, workflow);
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