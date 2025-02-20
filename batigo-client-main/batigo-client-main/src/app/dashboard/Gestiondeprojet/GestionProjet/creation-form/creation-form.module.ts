import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CreationFormComponent } from './creation-form.component';

const routes: Routes = [
  {
    path: '',
    component: CreationFormComponent
  }
];

@NgModule({
  declarations: [CreationFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CreationFormModule { }