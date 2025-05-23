import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SharedModule } from 'primeng/api';
import { UserResetPasswordStepCode } from 'src/app/interfaces/UserResetPasswordStepCode';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth-reset',
  standalone: true,
  imports: [RouterModule, SharedModule, NgxMaskDirective, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [provideNgxMask()],
  templateUrl: './auth-reset.component.html',
  styleUrls: ['./auth-reset.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export default class AuthSignupComponent implements OnInit {

  userResetPasswordStepCodeForm!: FormGroup;

  ngOnInit(): void {
    this.userResetPasswordStepCodeForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required])
    });
  }

  constructor(private userService: UserService, private swalFireService: SwalFireService, private router: Router) {

  }

  submit() {
    if (this.userResetPasswordStepCodeForm.invalid) {
      return;
    }

    const data: UserResetPasswordStepCode = this.userResetPasswordStepCodeForm.value;

    this.swalFireService.SwalLoading();

    this.userService.resetPasswordStepCode(data).subscribe({
      next: (response) => {
        this.swalFireService.SwalSuccess(response.message, () => {
          this.router.navigate(['/auth/reset/code']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }
}
