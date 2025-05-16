import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoicePix } from 'src/app/interfaces/InvoicePix';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';

@Component({
  selector: 'app-payment-pix',
  standalone: true,
  imports: [],
  templateUrl: './payment-pix.component.html',
  styleUrl: './payment-pix.component.scss'
})
export class PaymentPixComponent implements OnInit {
  @Input() invoicePix: InvoicePix;
  ngOnInit(): void {
    console.log(this.invoicePix);
  }

  constructor(public modal: NgbActiveModal, private datePipe: DatePipe, private snackbarService: SnackbarService) {
    
  }

  getDateFormatted(date: string) {
    return this.datePipe.transform(date, 'dd/MM/yyyy \'às\' HH:mm')
  }

  copyQrCode() {
    navigator.clipboard.writeText(this.invoicePix.payload).then(() => {
      this.snackbarService.Open('Qr-code copiado com sucesso!');
    });
  }
}
