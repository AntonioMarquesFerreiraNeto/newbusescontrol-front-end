import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export default class AuthSigninComponent {}
