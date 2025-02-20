import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjetListComponent } from './projetlist.component';

const routes: Routes = [
  {
    path: '',
    component: ProjetListComponent
  }
];

@NgModule({
  declarations: [ProjetListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjetListModule { }