import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './component/task-list/task-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from './component/task-form/task-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Task",
      urls: [{ title: "Task", url: "/task" }, { title: "task" }],
    },
    component: TaskListComponent,

  },{
    path: "new",
    data: {
      title: "New Task",
      urls: [{ title: "New Task", url: "/task/new" }, { title: "New Task" }],
    },
    component: TaskFormComponent,

  },{
    path: "list",
    data: {
      title: "Task",
      urls: [{ title: "Task", url: "/task/list" }, { title: "task" }],
    },
    component: TaskListComponent,

  },
];

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    
  ],
  imports: [
    CommonModule,
  RouterModule.forChild(routes),
  HttpClientModule,
  FormsModule,ReactiveFormsModule
  ],  exports: [FormsModule,ReactiveFormsModule]
})
export class TaskModule { }
