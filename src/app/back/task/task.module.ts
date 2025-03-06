import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './component/task-list/task-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from './component/task-form/task-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkflowComponent } from './component/workflow/workflow.component';
import { NewWorkflowComponent } from './component/new-workflow/new-workflow.component';
import { WorkflowDetailComponent } from './component/workflow-detail/workflow-detail.component';
import { UpdateTaskComponent } from './component/update-task/update-task.component';

import { CalendarDateFormatter, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  {
    path: "",
    data: {
      title: "workflow",
      urls: [{ title: "workflow", url: "/workflow" }, { title: "workflow" }],
    },
    component: WorkflowComponent,

  },

  {
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
    WorkflowComponent,
    NewWorkflowComponent,
    WorkflowDetailComponent,
    UpdateTaskComponent,
    
  ],
  imports: [
    CommonModule,
  RouterModule.forChild(routes),
  HttpClientModule,
  FormsModule,ReactiveFormsModule,
  FlatpickrModule.forRoot(),
  NgbModalModule,
  CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory,
  }),
  ], providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CalendarDateFormatter, // Add this provider
    }
  ], exports: [FormsModule,ReactiveFormsModule]
})
export class TaskModule { }
