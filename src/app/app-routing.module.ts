import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './front/Home/home.component';
import { SingInComponent } from './front/Authentication/sing-in/sing-in.component';
import { DashboardComponent } from './back/dashboard/dashboard.component';
import { FullComponent } from './back/layouts/full/full.component';
import { AuthGuard } from './front/data-access/auth.guard';

import { CommandeComponent } from './back/commande/commande.component';
import { LivraisonComponent } from './back/livraison/livraison.component';
import { ResetComponent } from './back/reset/reset.component';
import { ProductsClientComponent } from './front/products-client/products-client.component';
import { CreateprojetComponent } from './front/projet/createprojet/createprojet.component';
import { ViewprojetComponent } from './front/projet/viewprojet/viewprojet.component';
import { PlanificationCalendarComponent } from './front/livrable/planification-calendar/planification-calendar.component';
import { ViewlivrableComponent } from './front/livrable/viewlivrable/viewlivrable.component';
import { UpdatelivrableComponent } from './front/livrable/updatelivrable/updatelivrable.component';
import { UpdateprojetComponent } from './front/projet/updateprojet/updateprojet.component';
import { CreatelivrableComponent } from './front/livrable/createlivrable/createlivrable.component';
import { ManageIncidentComponent } from './back/incident/manage-incident/manage-incident.component';
import { AddIncidentComponent } from './back/incident/add-incident/add-incident.component';
import { StatIncidentComponent } from './back/incident/stat-incident/stat-incident.component';
import { ListInspectionsComponent } from './back/inspections/list-inspections/list-inspections.component';
import { ListIncidentComponent } from './back/incident/list-incident/list-incident.component';
import { ManageInspectionComponent } from './back/inspections/manage-inspection/manage-inspection.component';
import { AddInspectionsComponent } from './back/inspections/add-inspections/add-inspections.component';
import { ProjetAdminComponent } from './back/dashboard/projet-admin/projet-admin.component';
import { LivrableAdminComponent } from './back/dashboard/livrable-admin/livrable-admin.component';
import { LivrableStatisticsComponent } from './back/dashboard/livrable-statistics/livrable-statistics.component';
import { IncidentComponent } from './back/incident/incident.component';
import { WorkflowDetailComponent } from './back/task/component/workflow-detail/workflow-detail.component';

const routes: Routes = [

    { path: 'manage/:id', component: ManageIncidentComponent }, // Modifier un incident
    { path: 'create', component: AddIncidentComponent },
    { path: 'stat/incident', component: StatIncidentComponent},
    { path: 'listinsp/:id', component: ListInspectionsComponent },
    { path: 'incident', component: IncidentComponent
    },
    { path: 'manage/:id', component: ManageInspectionComponent }, // Modifier un incident
    { path: 'create/:id', component: AddInspectionsComponent},

  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: SingInComponent,
  },
  {
    path: 'reset-password',
    component: ResetComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./back/back.module').then((m) => m.BackModule),
  },
  {
    path: 'products',
    component: ProductsClientComponent,
  },

 {
    path: 'workflow',
    canActivate: [AuthGuard],
        component: FullComponent,
        children:[
          { path: ':id', component: WorkflowDetailComponent },
            {path:"", loadChildren: () => import('./back/task/task.module').then(m => m.TaskModule)}
        ]
   
  },
  {
    path:'createproject',component:CreateprojetComponent
  },
  {
    path:'projectlist',component:ViewprojetComponent
  },
  {path:'calendar',component:PlanificationCalendarComponent},
  {path:'viewlivrable',component:ViewlivrableComponent},
  {path:'update-livrable/:id',component:UpdatelivrableComponent},
  { path: 'updateproject/:id', component: UpdateprojetComponent },
  { path: 'projets/:projetId/add-livrable', component: CreatelivrableComponent } , {
    path: 'dashboard',
    loadChildren: () => import('./back/back.module').then(m => m.BackModule)
  },
  { path: 'approve-projects', component: ProjetAdminComponent },
  { path: 'livrable-admin', component: LivrableAdminComponent },
  { path: 'livrable-statistics', component: LivrableStatisticsComponent}, 

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
