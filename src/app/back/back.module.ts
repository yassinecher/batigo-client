import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';


import { SpinnerComponent } from './shared/spinner.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AppComponent } from '../app.component';
import { NavigationComponent } from './shared/header/navigation.component';
 
import { ExpenseComponent } from './expense/index/index.component';
import { IncomeComponent } from './income/index/index.component';
import { NewIncomeComponent } from './income/new-income/new-income.component';
 
import { EditIncomeComponent } from './income/edit-income/edit-income.component';
import { ShowIncomeComponent } from './income/show-income/show-income.component';
import { NewExpenseComponent } from './expense/new-expense/new-expense.component';
import { ShowExpenseComponent } from './expense/show-expense/show-expense.component';
import { EditExpenseComponent } from './expense/edit-expense/edit-expense.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjetComponent } from './projet/projet.component';
import { EditProjetComponent } from './projet/edit-projet/edit-projet.component';
import { ShowProjetComponent } from './projet/show-projet/show-projet.component';
import { NewProjetComponent } from './projet/new-projet/new-projet.component';
import { AuthGuard } from '../front/data-access/auth.guard';
 
export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
    
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
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
@NgModule({
  declarations: [
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
    ShowProjetComponent,
    NewProjetComponent,
    
  ],
  imports: [
    
    
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(Approutes),
    CommonModule,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    NgxPaginationModule,
    
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class BackModule { }
