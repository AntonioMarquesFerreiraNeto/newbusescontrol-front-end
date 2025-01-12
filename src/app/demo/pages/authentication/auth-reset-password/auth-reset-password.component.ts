import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { SharedModule } from 'primeng/api';
import { UserResetPasswordStepNewPassword } from 'src/app/interfaces/UserResetPasswordStepNewPassword';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth-reset-password',
  standalone: true,
  imports: [RouterModule, SharedModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth-reset-password.component.html',
  styleUrl: './auth-reset-password.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class AuthResetPasswordComponent implements OnInit {
  userId: string;
  resetToken: string;
  userResetPasswordStepNewPasswordForm: FormGroup;

  constructor(private userService: UserService, private swalFireService: SwalFireService, private router: Router) { }
  
  ngOnInit(): void {
    const sessionData = sessionStorage.getItem('resetPassword');
    if(!sessionData) {
      this.router.navigate(['/auth/signin']);
      return;
    }

    sessionStorage.removeItem('resetPassword');

    const parsedData = JSON.parse(sessionData);

    console.log(parsedData);

    this.userId = parsedData.userId;
    this.resetToken = parsedData.token;

    this.userResetPasswordStepNewPasswordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  submit(){
    if(this.userResetPasswordStepNewPasswordForm.invalid) {
      return;
    }

    let data : UserResetPasswordStepNewPassword = this.userResetPasswordStepNewPasswordForm.value;
    data.userId = this.userId;
    data.resetToken = this.resetToken;

    this.swalFireService.SwalLoading();

    this.userService.resetPasswordStepNewPassword(data).subscribe({
      next: (response) => {
        this.swalFireService.SwalSuccess(response.message, () => {
          this.router.navigate(['/auth/signin']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }
}
