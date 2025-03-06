import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService, Task } from '../../data-access/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
taskForm: FormGroup;
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<void>();
  constructor(private modalService: NgbModal,private fb: FormBuilder, private taskService: TaskService,private router:Router) {
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
      ] 
    });
    
  }
  ngOnInit(): void {
    
    this.taskForm = this.fb.group({
      title: [
        this.task.title , 
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      description: [
        this.task.description , 
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)]
      ],
      status: [
        this.task.status , 
        [Validators.required]
      ] ,dateStart: [   this.task.dateStart ? this.formatDateTime(this.task.dateStart) : '', [Validators.required, this.futureDateValidator]] // ✅ Custom validator
      ,dateEnd: [   this.task.dateEnd ? this.formatDateTime(this.task.dateEnd) : '', [Validators.required, this.futureDateValidator]] // ✅ Custom validator
    
    });
  }
  private formatDateTime(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:00`; // Format: YYYY-MM-DDTHH:MM
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
        dateStart:  this.formatDateTime(this.taskForm.value.dateStart),
        dateEnd:  this.formatDateTime(this.taskForm.value.dateEnd),
      };
      
      this.taskService.updateTask(this.task.id!,task).subscribe(()=>{
        this.taskUpdated.emit(); // Notify parent to reload tasks
      
      })
    }
  }
  close() { 
    this.modalService.dismissAll();
  }
}
