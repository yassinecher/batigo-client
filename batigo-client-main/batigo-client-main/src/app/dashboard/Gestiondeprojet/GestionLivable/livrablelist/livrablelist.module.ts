import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LivrablelistComponent } from './livrablelist.component';

const routes: Routes = [
  {
    path: '',
    component: LivrablelistComponent
  }
];

@NgModule({
  declarations: [LivrablelistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LivrableListModule { }