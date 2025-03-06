import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewWorkflowComponent } from '../new-workflow/new-workflow.component';
import { Workflow, WorkflowService } from '../../data-access/workflow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent {
  workflowList:Workflow[]=[]
 constructor( private modalService: NgbModal,private workflowService:WorkflowService ,private router:Router){
  workflowService.getWorkflows().subscribe((list)=>{
    this.workflowList=list
  })

 }
 navigateToWorkflow(id:any){
this.router.navigate(["/workflow/"+id])
 }
  addNewWorkflow(){
    const modalRef =this.modalService.open(NewWorkflowComponent);
              modalRef.componentInstance.title = "Registration";
              modalRef.componentInstance.message ="Your account has been created! Please wait for admin confirmation." ;
              modalRef.result.then(() => {
              
              });
  }
}
