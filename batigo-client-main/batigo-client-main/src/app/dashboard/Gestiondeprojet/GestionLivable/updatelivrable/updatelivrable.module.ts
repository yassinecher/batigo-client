import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UpdatelivrableComponent } from './updatelivrable.component';

const routes: Routes = [
  {
    path: '',
    component: UpdatelivrableComponent
  }
];

@NgModule({
  declarations: [UpdatelivrableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UpdatelivrableModule { }