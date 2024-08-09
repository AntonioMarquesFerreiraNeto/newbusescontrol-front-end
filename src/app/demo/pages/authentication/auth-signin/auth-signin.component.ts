import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Login } from 'src/app/interfaces/Login';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export default class AuthSigninComponent implements OnInit {
  type: string = 'password';
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

  CheckPassword() {
    if (this.type == 'password') 
    {
      this.type = 'text';
    }
    else 
    {
      this.type = 'password'
    }
  }

  submit() {
    if (this.loginForm.invalid) {
      this.snackbarService.Open('E-mail ou senha inválido!');
      return;
    }

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
