import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AppComponent } from '../app.component';
import { NavigationComponent } from './shared/header/navigation.component';
import { SpinnerComponent } from './shared/spinner.component';

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
      {
        path: 'create',
        loadChildren: () => import('../dashboard/Gestiondeprojet/GestionProjet/creation-form/creation-form.module').then(m => m.CreationFormModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('../dashboard/Gestiondeprojet/GestionProjet/projetlist/projetlist.module').then(m => m.ProjetListModule)
      },
      {
        path: 'update/:id',
        loadChildren: () => import('../dashboard/Gestiondeprojet/GestionProjet/projetupdate/projetupdate.module').then(m => m.ProjetupdateModule)
      },
      {
        path: 'createlivrable',
        loadChildren: () => import('../dashboard/Gestiondeprojet/GestionLivable/createlivrable/createlivrable.module').then(m => m.CreatelivrableModule)
      },
      {
        path: 'livrablelist',
        loadChildren: () => import('../dashboard/Gestiondeprojet/GestionLivable/livrablelist/livrablelist.module').then(m => m.LivrableListModule)
      },
      {
        path: 'update-livrable/:id',
        loadChildren: () => import('../dashboard/Gestiondeprojet/GestionLivable/updatelivrable/updatelivrable.module').then(m => m.UpdatelivrableModule)
      },
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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(Approutes),
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