import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../data-access/authentication.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../../Shared/error-modal/error-modal.component';
import { SuccessModalComponent } from '../../Shared/success-modal/success-modal.component';
import { UserService } from '../../../back/users/data-access/user.service';
import { VerificationModalComponent } from 'src/app/Shared/verification-modal/verification-modal.component';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  emailVerified = false;
  verificationCodeSent = false;
  activeTab: 'login' | 'register' = 'login';


  
  @ViewChild('loginTab', { static: false }) loginTab!: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,  private modalService: NgbModal,
    private userService: UserService
  ) {
    if(userService.getToken()){
      userService.getUserFromDatabase().subscribe((user)=>{
        router.navigate(["/dashboard"])
      },()=>{
     
      })
    }
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    // Formulaire de connexion
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Formulaire d'inscription
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]], // Numéro entre 8 et 15 chiffres
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Méthode de connexion
  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Logged in successfully', response);
          localStorage.setItem("access_token",response.access_token)
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
          const modalRef =this.modalService.open(ErrorModalComponent);
          modalRef.componentInstance.title = "Login";
          modalRef.componentInstance.message = err.error;
          modalRef.result.then(() => {
 
          });
        }
      });
    }
  }

  // Méthode d'inscription
  register() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
  
      this.authService.sendVerificationCode(email).subscribe({
        next: () => {
          const modalRef = this.modalService.open(VerificationModalComponent);
          modalRef.componentInstance.email = email;
  
          modalRef.result.then((verificationSuccess: boolean) => {
            if (verificationSuccess) {
              this.continueRegistration();
            }
          }).catch(() => {
            // Modal dismissed
          });
        },
        error: () => {
          Swal.fire('Erreur', "Impossible d’envoyer le code de vérification.", 'error');
        }
      });
    }
  }
  
  continueRegistration() {
    const { firstName, lastName, email, phoneNumber, password, gender } = this.registerForm.value;
  
    this.authService.register(firstName, lastName, email, phoneNumber, password, gender).subscribe({
      next: (response) => {
        localStorage.setItem("access_token", response.access_token);
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: "Votre compte a été créé !",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/login']);
          this.loginTab.nativeElement.click();
        });

      },
      error: (err) => {
        const modalRef = this.modalService.open(ErrorModalComponent);
        modalRef.componentInstance.title = "Registration";
        modalRef.componentInstance.message = err.error;
      }
    });
  }
  
  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  forgetPassword() {
    this.authService.sendResetEmail(this.loginForm.value?.email).subscribe({
      next: () => alert("Reset email sent!"),
      error: () => alert("Failed to send reset email."),
    });
  }

  sendVerificationCode() {
    const email = this.registerForm.get('email')?.value;
    if (!email || this.registerForm.get('email')?.invalid) {
      this.registerForm.get('email')?.markAsTouched();
      return;
    }
  
    this.authService.sendVerificationCode(email).subscribe({
      next: () => {
        this.verificationCodeSent = true;
        Swal.fire('Code envoyé', 'Un code de vérification a été envoyé à votre email.', 'success');
      },
      error: () => {
        Swal.fire('Erreur', "L'envoi du code a échoué.", 'error');
      }
    });
  }
  verifyCode(code: string) {
  const email = this.registerForm.get('email')?.value;
  this.authService.verifyEmailCode(email, code).subscribe({
    next: () => {
      this.emailVerified = true;
      Swal.fire('Succès', "Email vérifié !", 'success');
    },
    error: () => {
      this.emailVerified = false;
      Swal.fire('Erreur', "Code incorrect ou expiré.", 'error');
    }
  });
}
switchToLogin() {
  this.activeTab = 'login';
}

switchToRegister() {
  this.activeTab = 'register';
}
}