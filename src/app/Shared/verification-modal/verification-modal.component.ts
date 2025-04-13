import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/back/users/data-access/user.service';
import { AuthenticationService } from 'src/app/front/data-access/authentication.service';

@Component({
  selector: 'app-verification-modal',
  templateUrl: './verification-modal.component.html',
})
export class VerificationModalComponent {
  @Input() email: string = '';
  code: string = '';
  error: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private authService:AuthenticationService
  ) {}

  verify() {
    this.authService.verifyEmailCode(this.email, this.code).subscribe({
      next: (response) => {
        alert("✅ Email vérifié avec succès !");
        this.activeModal.close(true); // Success
      },
      error: (err) => {
        if (err.status === 400) {
          this.error = "❌ Code invalide ou expiré.";
        } else {
          this.error = "❌ Une erreur est survenue. Veuillez réessayer.";
        }
      }
    });
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
