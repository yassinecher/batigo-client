import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentComponent } from './incident.component';
import { ManageIncidentComponent } from './manage-incident/manage-incident.component';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { StatIncidentComponent } from './stat-incident/stat-incident.component';

const routes: Routes = [{ path: '', component: IncidentComponent },


  { path: 'manage/:id', component: ManageIncidentComponent }, // Modifier un incident
  { path: 'create', component: AddIncidentComponent },
  { path: 'stat/incident', component: StatIncidentComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentRoutingModule { }
