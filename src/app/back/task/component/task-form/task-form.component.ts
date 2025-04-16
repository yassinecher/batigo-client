import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Task, TaskService } from '../../data-access/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private taskService: TaskService,private router:Router) {
    this.taskForm = this.fb.group({
      title: [
        '', 
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      description: [
        '', 
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)]
      ],
      status: [
        'IN_PROGRESS', 
        [Validators.required]
      ] ,dateMax: ['', [Validators.required, this.futureDateValidator]] // ✅ Custom validator
    
    });
    
  }
   // Custom Validator to check if dateMax is in the future
   futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    return selectedDate >= today ? null : { futureDate: true };
  }
  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = {
        ...this.taskForm.value,
        dateMax: new Date(this.taskForm.value.dateMax) // Ensure it's a valid date object
      };
      
      this.taskService.createTask(task).subscribe({
        next: () => {
          this.message = 'Task created successfully!';
          this.router.navigate(['/task/list']);
        },
        error: (error) => {
          this.message = 'Error creating task';
          console.error(error);
        }
      });
    }
  }
  
}
