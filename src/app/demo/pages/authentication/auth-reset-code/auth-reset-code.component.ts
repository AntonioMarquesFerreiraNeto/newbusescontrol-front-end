import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SharedModule } from 'primeng/api';
import { UserResetPasswordStepCode } from 'src/app/interfaces/UserResetPasswordStepCode';
import { UserResetPasswordStepNewPassword } from 'src/app/interfaces/UserResetPasswordStepNewPassword';
import { UserResetPasswordStepResetToken } from 'src/app/interfaces/UserResetPasswordStepResetToken';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth-reset-code',
  standalone: true,
  imports: [RouterModule, SharedModule, NgxMaskDirective, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [provideNgxMask()],
  templateUrl: './auth-reset-code.component.html',
  styleUrl: './auth-reset-code.component.scss',
  animations: [fadeInOnEnterAnimation()]
})
export class AuthResetCodeComponent implements OnInit {
  userResetPasswordStepResetTokenForm!: FormGroup;

  ngOnInit(): void {
    this.userResetPasswordStepResetTokenForm = new FormGroup({
      code: new FormControl('', [Validators.required])
    });
  }

  constructor(private userService: UserService, private swalFireService: SwalFireService, private router: Router) {

  }

  submit() {
    if (this.userResetPasswordStepResetTokenForm.invalid) {
      return;
    }

    const data: UserResetPasswordStepResetToken = this.userResetPasswordStepResetTokenForm.value;

    this.swalFireService.SwalLoading();

    this.userService.resetPasswordStepResetToken(data).subscribe({
      next: (response) => {
        this.swalFireService.SwalSuccess("Tudo certo! Agora você pode redefinir sua senha!", () => {
          const data = {
            userId: response.userId,
            token: response.token,
          };
          sessionStorage.setItem('resetPassword', JSON.stringify(data));
          
          this.router.navigate(['/auth/reset/password']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }
}
