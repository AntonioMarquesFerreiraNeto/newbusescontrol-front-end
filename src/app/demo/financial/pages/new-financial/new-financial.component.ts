import { Component } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-new-financial',
  standalone: true,
  imports: [],
  templateUrl: './new-financial.component.html',
  styleUrl: './new-financial.component.scss',
  animations: [fadeInOnEnterAnimation()]
})
export class NewFinancialComponent {

}
