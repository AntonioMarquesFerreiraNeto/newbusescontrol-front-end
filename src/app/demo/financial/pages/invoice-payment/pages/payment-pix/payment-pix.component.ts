import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-pix',
  standalone: true,
  imports: [],
  templateUrl: './payment-pix.component.html',
  styleUrl: './payment-pix.component.scss'
})
export class PaymentPixComponent implements OnInit {
  ngOnInit(): void {
    
  }

  constructor(public modal: NgbActiveModal) {}
}
