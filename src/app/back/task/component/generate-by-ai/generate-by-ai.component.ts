import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task, TaskService } from '../../data-access/task.service';
import { Router } from 'express';

@Component({
  selector: 'app-generate-by-ai',
  templateUrl: './generate-by-ai.component.html',
  styleUrls: ['./generate-by-ai.component.scss']

})
export class GenerateByAiComponent implements OnInit {
  // Form group for metadata
  metadataForm: FormGroup;
@Input() workflowId! :number;
 @Output() taskUpdated = new EventEmitter<void>();
  // State for results and UI
  webhookResponse: any[] = []; // Array of tasks
  errorMessage: string | null = null;
  isLoading = false;

  constructor(private http: HttpClient, private fb: FormBuilder,private modalService: NgbModal, private taskService: TaskService) {
    // Initialize form with default values
    this.metadataForm = this.fb.group({
      building_space: [900, [Validators.required, Validators.min(0)]],
      floors: [2, [Validators.required, Validators.min(0)]],
      windows: [20, [Validators.required, Validators.min(0)]],
      doors: [15, [Validators.required, Validators.min(0)]],
      stairs: [2, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  // Handle form submission
  onSubmit() {
    if (!this.metadataForm.valid) {
      this.errorMessage = 'Please fill in all metadata fields correctly';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.webhookResponse = [];

    // Get metadata from form
    const metadata = this.metadataForm.value;

    // Send metadata to webhook
    this.http.post('http://localhost:5678/webhook/generate-workflow', metadata)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error?.detail || 'An error occurred while sending data to the webhook';
          this.isLoading = false;
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (webhookResult: any) => {
          // Ensure webhookResult is an array
          this.webhookResponse = Array.isArray(webhookResult) ? webhookResult : [];
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }
  onSubmit1(task: any): void {
    if (task) {
      const now = new Date();
const endDate = new Date();
endDate.setDate(now.getDate() + task.durationDays);

      const formattedTask: any = {
        title: task.name,
        description: task.description,
        status: 'TODO', // Default status, adjust as needed
        dateStart: this.formatDateToString(now),
        dateEnd: this.formatDateToString(endDate),    workflowId: this.workflowId // Assuming workflowId is available in the component
      };
  
      this.taskService.addTask(this.workflowId, formattedTask).subscribe(() => {
        this.taskUpdated.emit(); // Notify parent to reload tasks
        console.log('Task submitted:', formattedTask);
      });
    } else {
      console.error('Invalid task data');
    }
  }
   formatDateToString(date: Date): string {
    // Pad to ensure 2-digit format
    const pad = (n: number) => n.toString().padStart(2, '0');
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months start at 0
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
}