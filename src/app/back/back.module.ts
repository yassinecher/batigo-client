import { NgModule } from '@angular/core';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

import { SpinnerComponent } from './shared/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AppComponent } from '../app.component';
import { NavigationComponent } from './shared/header/navigation.component';

import { LivraisonComponent } from './livraison/livraison.component';
import { CommandeComponent } from './commande/commande.component';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user/user.component';
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ResetComponent } from './reset/reset.component';
import { AddFournisseurComponent } from './add-fournisseur/add-fournisseur.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { UpdateFournisseurComponent } from './update-fournisseur/update-fournisseur.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { ProductsComponent } from './products/products.component';
import { ProductStatsComponent } from './product-stats/product-stats.component';
import { FormPrductComponent } from './products/form-prduct/form-prduct.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LivrableAdminComponent } from './dashboard/livrable-admin/livrable-admin.component';
import { LivrableStatisticsComponent } from './dashboard/livrable-statistics/livrable-statistics.component';
import { ProjetAdminComponent } from './dashboard/projet-admin/projet-admin.component';
import { IncidentComponent } from './incident/incident.component';
import { AddIncidentComponent } from './incident/add-incident/add-incident.component';
import { DataAccessComponent } from './incident/data-access/data-access.component';
import { ListIncidentComponent } from './incident/list-incident/list-incident.component';
import { ManageIncidentComponent } from './incident/manage-incident/manage-incident.component';
import { StatIncidentComponent } from './incident/stat-incident/stat-incident.component';
import { InspectionsComponent } from './inspections/inspections.component';
import { AddInspectionsComponent } from './inspections/add-inspections/add-inspections.component';
import { ListInspectionsComponent } from './inspections/list-inspections/list-inspections.component';
import { ManageInspectionComponent } from './inspections/manage-inspection/manage-inspection.component';
import { EditExpenseComponent } from './expense/edit-expense/edit-expense.component';
import { ExpenseComponent } from './expense/index/index.component';
import { NewExpenseComponent } from './expense/new-expense/new-expense.component';
import { ShowExpenseComponent } from './expense/show-expense/show-expense.component';
import { EditIncomeComponent } from './income/edit-income/edit-income.component';
import { IncomeComponent } from './income/index/index.component';
import { NewIncomeComponent } from './income/new-income/new-income.component';
import { ShowIncomeComponent } from './income/show-income/show-income.component';
import { EditProjetComponent } from './projet/edit-projet/edit-projet.component';
import { NewProjetComponent } from './projet/new-projet/new-projet.component';
import { ProjetComponent } from './projet/projet.component';
import { ShowProjetComponent } from './projet/show-projet/show-projet.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
export const Approutes: Routes = [

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },

      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'component',
        loadChildren: () =>
          import('./component/component.module').then(
            (m) => m.ComponentsModule
          ),
      },

      { path: 'commande', component: CommandeComponent },
      { path: 'livraison', component: LivraisonComponent },

      // { path: 'produit', component: ProduitComponent },
      { path: 'cart', component: CartComponent },
      { path: 'user', component: UserComponent },
      {
        path: 'fournisseur',
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
        path: 'category',
        children: [
          {
            path: 'list',
            component: CategoriesComponent,
          },
        ],
      },
      {
        path: 'products',
        children: [
          {
            path: 'list',
            component: ProductsComponent,
          },

          { path: 'stats', component: ProductStatsComponent },
        ],
      },

      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      { path: 'approve-projects', component: ProjetAdminComponent },
      { path: 'livrable-admin', component: LivrableAdminComponent },
      { path: 'livrable-statistics', component: LivrableStatisticsComponent}, 

      // OUssema back url's

      
    ],
  },
  {
    path: '**',
    redirectTo: '/starter',
  },
];
@NgModule({
  declarations: [
    SpinnerComponent,
    NavigationComponent,
    FullComponent,
    CommandeComponent,
    LivraisonComponent,
    CartComponent,
    UserComponent,
    ResetComponent,
    AddFournisseurComponent,
    FournisseurListComponent,
    UpdateFournisseurComponent,
    CategoriesComponent,
    AddCategoryComponent,
    ProductsComponent,
    ProductStatsComponent,
    FormPrductComponent,
    IncidentComponent,
    AddIncidentComponent,
    DataAccessComponent,
    ListIncidentComponent,
    ManageIncidentComponent,
    StatIncidentComponent,
    InspectionsComponent,
    AddInspectionsComponent,
    ListInspectionsComponent,
    ManageInspectionComponent,
     SpinnerComponent,
    
    ExpenseComponent,
    IncomeComponent,
    NewIncomeComponent,
   
    EditIncomeComponent,
    ShowIncomeComponent,
    NewExpenseComponent,
    ShowExpenseComponent,
    EditExpenseComponent,
    ProjetComponent,
    EditProjetComponent,
  ],
  imports: [

    RouterModule,
    CommonModule,
    NgbDropdownModule,
    NgbCollapseModule,
    RouterModule.forChild(Approutes),
    SidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgApexchartsModule,
    NgxPaginationModule,
    
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class BackModule {}
