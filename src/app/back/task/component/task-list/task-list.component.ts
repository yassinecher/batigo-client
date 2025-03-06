import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../data-access/task.service';
import { Router } from '@angular/router';
import { WorkflowService } from '../../data-access/workflow.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor( private modalService: NgbModal,private taskService: TaskService,private workflowService:WorkflowService ,private router:Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask() {
     const modalRef =this.modalService.open(TaskFormComponent);
               modalRef.componentInstance.title = "Registration";
               modalRef.componentInstance.message ="Your account has been created! Please wait for admin confirmation." ;
               modalRef.result.then(() => {
               
               });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}