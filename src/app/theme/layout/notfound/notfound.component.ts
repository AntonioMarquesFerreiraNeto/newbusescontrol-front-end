import { Component } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
  animations: [fadeInOnEnterAnimation()]
})
export class NotfoundComponent {
  gotToHome() {
    var logged = Boolean(localStorage.getItem('logged'));
    window.location.href = logged ? '/dashboard' : '/home';
  }
}
