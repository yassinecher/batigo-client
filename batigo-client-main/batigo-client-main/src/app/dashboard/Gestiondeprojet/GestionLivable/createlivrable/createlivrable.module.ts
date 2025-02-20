import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CreatelivrableComponent } from './createlivrable.component';

const routes: Routes = [
  {
    path: '',
    component: CreatelivrableComponent
  }
];

@NgModule({
  declarations: [CreatelivrableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CreatelivrableModule { }