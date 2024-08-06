import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Login } from 'src/app/interfaces/Login';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export default class AuthSigninComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get username() {
    return this.loginForm.get("username").value!;
  }

  get password() {
    return this.loginForm.get("password").value!;
  }

  submit() {
    if (this.loginForm.invalid) return;

    const data: Login = this.loginForm.value;

    this.authService.Login(data).subscribe({
      next: (response) => {
        this.authService.SetToken(response.token);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 0) {
          this.snackbarService.Open("Desculpe, não conseguimos processar sua solicitação.");
          return;
        }
        this.snackbarService.Open(error.error.detail);
      }
    });
  }
}
