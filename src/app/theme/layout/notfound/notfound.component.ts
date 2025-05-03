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

}
