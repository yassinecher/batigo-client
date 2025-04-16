import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Users",
      urls: [{ title: "Users", url: "/users" }, { title: "users" }],
    },
    component: UserListComponent,

  }
  
];

@NgModule({
  declarations: [
UserListComponent
    
  ],
  imports: [
    CommonModule,
  RouterModule.forChild(routes),
  HttpClientModule,
  FormsModule,ReactiveFormsModule
  ],  exports: [FormsModule,ReactiveFormsModule]
})
export class UserModule { }
