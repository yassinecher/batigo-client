import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionsRoutingModule } from './inspections-routing.module';
import { InspectionsComponent } from './inspections.component';
import { AddInspectionsComponent } from './add-inspections/add-inspections.component';
import { ManageInspectionComponent } from './manage-inspection/manage-inspection.component';
import { ListInspectionsComponent } from './list-inspections/list-inspections.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InspectionsComponent,
    AddInspectionsComponent,
    ManageInspectionComponent,
    ListInspectionsComponent,
  ],
  imports: [
    CommonModule,
    InspectionsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class InspectionsModule { }
