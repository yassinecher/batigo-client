import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
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
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdpaginationBasicComponent } from '../component/pagination/pagination.component';
import { GenerateByAiComponent } from './component/generate-by-ai/generate-by-ai.component';
import { ImageUploadComponent } from './component/image-upload/image-upload.component';
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
    GenerateByAiComponent,
    ImageUploadComponent,
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
  }),NgbPaginationModule, NgIf
  ], providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CalendarDateFormatter, // Add this provider
    }
  ], exports: [FormsModule,ReactiveFormsModule]
})
export class TaskModule { }
