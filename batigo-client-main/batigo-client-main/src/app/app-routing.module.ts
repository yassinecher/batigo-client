import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './front/Home/home.component';
import { SingInComponent } from './front/Authentication/sing-in/sing-in.component';
import { DashboardComponent } from './back/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent,
  },
  {
    path:'login',component:SingInComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./back/back.module').then(m => m.BackModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
