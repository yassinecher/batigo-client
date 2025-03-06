import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './front/Home/home.component';
import { SingInComponent } from './front/Authentication/sing-in/sing-in.component';
import { DashboardComponent } from './back/dashboard/dashboard.component';
import { FullComponent } from './back/layouts/full/full.component';
import { AuthGuard } from './front/data-access/auth.guard';
import { AddFournisseurComponent } from './components/add-fournisseur/add-fournisseur.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { UpdateFournisseurComponent } from './update-fournisseur/update-fournisseur.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'login', component: SingInComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./back/back.module').then(m => m.BackModule),
  },
  {
    path: 'task',
    canActivate: [AuthGuard],
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./back/task/task.module').then(m => m.TaskModule),
      },
    ],
  },
  {
    path: 'fournisseur',
    canActivate: [AuthGuard],
    component: FullComponent,
    children: [
      {
        path: 'add',
        component: AddFournisseurComponent, // AddFournisseurComponent nested under FullComponent
      },
      {
        path: 'list',
        component: FournisseurListComponent, // FournisseurListComponent nested under FullComponent
      },
      {
        path: 'update/:id', // Add route for updating fournisseur with an 'id' parameter
        component: UpdateFournisseurComponent, // Now you can navigate to UpdateFournisseurComponent
      },
    ],
  },
  
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./back/users/users.module').then(m => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
