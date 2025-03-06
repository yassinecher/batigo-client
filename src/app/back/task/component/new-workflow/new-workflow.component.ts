import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Workflow, WorkflowService } from '../../data-access/workflow.service';

@Component({
  selector: 'app-new-workflow',
  templateUrl: './new-workflow.component.html',
  styleUrls: ['./new-workflow.component.scss']
})
export class NewWorkflowComponent {
  @Input() message: string = '';
  @Input() title: string = '';
    workflowForm!: FormGroup;
  constructor(private modalService: NgbModal, private fb: FormBuilder,private workflowService:WorkflowService) {
        this.workflowForm= this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3)]]
        });
  }
  error=""
  addWorkflow() {
    if (this.workflowForm.valid) {
      const newWorkflow: Workflow = {
        name: this.workflowForm.value.name
      };

      this.workflowService.createWorkflow(newWorkflow).subscribe({
        next: (response) => {
          console.log('Workflow created:', response);
          this.close(); // Close modal on success
        },
        error: (err) => {
          console.error('Error creating workflow:', err);
          this.error=err.message

        }
      });
    }
  }
  close() { 
    this.modalService.dismissAll();
  }
}
