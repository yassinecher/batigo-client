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
import { AccountComponent } from './account/account.component';
import { ExpenseComponent } from './expense/index/index.component';
import { IncomeComponent } from './income/index/index.component';
import { NewIncomeComponent } from './income/new-income/new-income.component';
import { NewAccountComponent } from './account/new-account/new-account.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
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
    AccountComponent,
    ExpenseComponent,
    IncomeComponent,
    NewIncomeComponent,
    NewAccountComponent
  ],
  imports: [
    
    
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(Approutes),
    CommonModule,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
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
