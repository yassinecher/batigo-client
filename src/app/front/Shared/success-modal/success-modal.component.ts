import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent {
  @Input() message: string = '';
  @Input() title: string = '';
  constructor(private modalService: NgbModal, private router: Router) {}

  close() {
    this.modalService.dismissAll();
    this.router.navigate(['/login']);
  }
}
