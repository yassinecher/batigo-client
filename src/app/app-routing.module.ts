import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './front/Home/home.component';
import { SingInComponent } from './front/Authentication/sing-in/sing-in.component';
import { FullComponent } from './back/layouts/full/full.component';
import { AuthGuard } from './front/data-access/auth.guard';
import { AddFournisseurComponent } from './components/add-fournisseur/add-fournisseur.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { UpdateFournisseurComponent } from './update-fournisseur/update-fournisseur.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductStatsComponent } from './components/product-stats/product-stats.component';
import { ProductsClientComponent } from './front/products-client/products-client.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: SingInComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./back/back.module').then((m) => m.BackModule),
  },
  { path: 'products', component: ProductsClientComponent },
  {
    path: 'task',
    canActivate: [AuthGuard],
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./back/task/task.module').then((m) => m.TaskModule),
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
        component: AddFournisseurComponent,
      },
      {
        path: 'list',
        component: FournisseurListComponent,
      },
      {
        path: 'update/:id',
        component: UpdateFournisseurComponent,
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
        loadChildren: () =>
          import('./back/users/users.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'category',
    component: FullComponent,
    children: [
      {
        path: 'list',
        component: CategoriesComponent,
      },
    ],
  },
  {
    path: 'products',
    component: FullComponent,
    children: [
      {
        path: 'list',
        component: ProductsComponent,
      },
      { path: 'stats', component: ProductStatsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
