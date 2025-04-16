import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentRoutingModule } from './incident-routing.module';
import { IncidentComponent } from './incident.component';
import { ListIncidentComponent } from './list-incident/list-incident.component';
import { ManageIncidentComponent } from './manage-incident/manage-incident.component';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatIncidentComponent } from './stat-incident/stat-incident.component';


@NgModule({
  declarations: [
    IncidentComponent,
    ListIncidentComponent,
    ManageIncidentComponent,
    AddIncidentComponent,
    StatIncidentComponent
  ],
  imports: [
    CommonModule,
    IncidentRoutingModule,
    ReactiveFormsModule
  ]
})
export class IncidentModule { }
