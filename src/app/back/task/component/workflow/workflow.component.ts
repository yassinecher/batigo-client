import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewWorkflowComponent } from '../new-workflow/new-workflow.component';
import { Workflow, WorkflowService } from '../../data-access/workflow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {

  workflowList: Workflow[] = [];
  filteredWorkflowList: Workflow[] = [];
  currentPage = 1;
  pageSize = 3; // Number of items per page
  totalItems = 0;
  searchQuery = '';

  constructor(
    private modalService: NgbModal,
    private workflowService: WorkflowService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWorkflows();
  }

  loadWorkflows(): void {
    this.workflowService.getWorkflows().subscribe((list) => {
      this.workflowList = list;
      this.filteredWorkflowList = list;
      this.totalItems = list.length;
    });
  }

  filterWorkflows(): void {
    this.filteredWorkflowList = this.workflowList.filter(workflow => 
      workflow.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    this.totalItems = this.filteredWorkflowList.length;
    this.currentPage = 1;
  }

  navigateToWorkflow(id: any): void {
    this.router.navigate(["/workflow/" + id]);
  }

  addNewWorkflow(): void {
    const modalRef = this.modalService.open(NewWorkflowComponent);
    modalRef.componentInstance.title = "New Workflow";
    
    modalRef.result.then(() => {
      this.loadWorkflows();
    },()=>{
      this.loadWorkflows();
    });
  }

  updateWorkflow(workflow: Workflow): void {
    const modalRef = this.modalService.open(NewWorkflowComponent);
    modalRef.componentInstance.title = "Update Workflow";
    modalRef.result.then(() => {
      this.loadWorkflows();
    });
  }

  deleteWorkflow(workflow: Workflow): void {
    this.workflowService.deleteWorkflow(workflow.id!).subscribe(
      () => this.loadWorkflows(),
      () => this.loadWorkflows()
    );
  }
}
