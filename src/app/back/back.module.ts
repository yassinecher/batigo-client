  import { NgModule } from '@angular/core';
  import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { RouterModule, Routes } from '@angular/router';
  import { FullComponent } from './layouts/full/full.component';
  import { SidebarComponent } from './shared/sidebar/sidebar.component';
  import { AppComponent } from '../app.component';
  import { NavigationComponent } from './shared/header/navigation.component';
  import { SpinnerComponent } from './shared/spinner.component';
  import { AdminApproveComponent } from './dashboard/projet-admin/admin-approve/admin-approve.component';
  import { AdminLivrableComponent } from './dashboard/livrable-admin/admin-livrable/admin-livrable.component';
import { LivrableStatisticsComponent } from './dashboard/livrable-statistics/livrable-statistics.component';

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
        { path: 'approve-projects', component: AdminApproveComponent },
        { path: 'livrable-admin', component: AdminLivrableComponent },
        { path: 'livrable-statistics', component: LivrableStatisticsComponent}, 

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