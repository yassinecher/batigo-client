import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionsComponent } from './inspections.component';
import { ManageInspectionComponent } from './manage-inspection/manage-inspection.component';
import { AddInspectionsComponent } from './add-inspections/add-inspections.component';
import { ListInspectionsComponent } from './list-inspections/list-inspections.component';

const routes: Routes = [{ path: '', component: InspectionsComponent },
  { path: 'listinsp/:id', component: ListInspectionsComponent }, // Modifier un incident

    { path: 'manage/:id', component: ManageInspectionComponent }, // Modifier un incident
    { path: 'create/:id', component: AddInspectionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionsRoutingModule { }
