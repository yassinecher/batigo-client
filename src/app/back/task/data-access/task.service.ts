import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
  dateEnd:Date
  dateStart:Date
  workflowId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:9090/server/api/tasks'; // Change this if your backend URL is different

  constructor(private http: HttpClient) {}

  // Get all tasks
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  // Get a task by ID
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  // Create a new task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  // Update a task
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task);
  }

  // Delete a task
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getTasksByWorkflow(workflowId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/workflowId/${workflowId}`);
  }

  addTask(workflowId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/workflowId/${workflowId}`, task);
  }
}
