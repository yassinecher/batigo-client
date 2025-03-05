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
import { UserListComponent } from './users/components/user-list/user-list.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { CommandeComponent } from './commande/commande.component';

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
      },
   
     { path: 'commande', component: CommandeComponent },
     { path: 'livraison', component: LivraisonComponent },
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
    CommandeComponent,LivraisonComponent
  ],
  imports: [
    
    
 
    RouterModule.forChild(Approutes),

    FullComponent,
    NavigationComponent,
    SidebarComponent,   FormsModule,
    ReactiveFormsModule,CommonModule,
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
