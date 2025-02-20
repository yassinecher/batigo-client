import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProjetupdateComponent } from './projetupdate.component';

const routes: Routes = [
  {
    path: '',
    component: ProjetupdateComponent
  }
];

@NgModule({
  declarations: [ProjetupdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjetupdateModule { }