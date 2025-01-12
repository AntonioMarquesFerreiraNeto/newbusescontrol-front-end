import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthResetCodeComponent } from './auth-reset-code/auth-reset-code.component';
import { AuthResetPasswordComponent } from './auth-reset-password/auth-reset-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin',
        loadComponent: () => import('./auth-signin/auth-signin.component')
      },
      {
        path: 'reset',
        loadComponent: () => import('./auth-reset/auth-reset.component')
      },
      {
        path: 'reset/code',
        component: AuthResetCodeComponent
      },
      {
        path: 'reset/password',
        component: AuthResetPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
