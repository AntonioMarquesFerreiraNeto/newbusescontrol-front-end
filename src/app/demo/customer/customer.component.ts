import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatPaginatorModule, SharedModule, RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class CustomerComponent {

}
