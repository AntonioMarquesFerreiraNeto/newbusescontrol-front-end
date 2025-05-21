import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'primeng/api';

@Component({
  selector: 'app-options-financial',
  standalone: true,
  imports: [RouterModule, SharedModule, CommonModule],
  templateUrl: './options-financial.component.html',
  styleUrl: './options-financial.component.scss'
})
export class OptionsFinancialComponent {
  constructor(public modal: NgbActiveModal) {

  }
}
