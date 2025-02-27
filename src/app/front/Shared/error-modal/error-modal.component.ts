import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {
  @Input() message: string = '';
  @Input() title: string = '';
  constructor(private modalService: NgbModal) {}

  close() {
    this.modalService.dismissAll();
  }
}
