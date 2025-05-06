import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Invoice } from 'src/app/interfaces/Invoice';
import { CommonService } from 'src/app/services/common.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';

@Component({
  selector: 'app-invoice-payment',
  standalone: true,
  imports: [RouterModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './invoice-payment.component.html',
  styleUrl: './invoice-payment.component.scss'
})
export class InvoicePaymentComponent implements OnInit {
  financialId: string;
  invoiceId: string;
  invoice: Invoice;

  ngOnInit(): void {
    this.financialId = this.route.snapshot.paramMap.get('financialid');
    this.invoiceId = this.route.snapshot.paramMap.get('invoiceid');

    this.invoice = JSON.parse(sessionStorage.getItem(this.invoiceId));
    if (this.invoice == null) {
      this.snackbarService.Open('Fatura não encontrada.');
      this.router.navigate([`/financials/${this.financialId}/invoices`]);
    }
  }

  constructor(private route: ActivatedRoute, private router: Router, private snackbarService: SnackbarService, public commonService: CommonService) { }

  getStatusDescription(status) {
    switch(status){
      case 'Pending': return "Pendente";
      case 'Paid': return "Paga";
      case 'OverDue': return "Atrasada";
      case 'Canceled': return "Cancelada";
      default: return "Não encontrado";
    }
  }

  getStatusLabel(status) {
    switch(status){
      case 'Pending': return "label label-blue";
      case 'Paid': return "label label-green";
      case 'OverDue': return "label label-orange";
      case 'Canceled': return "label label-red";
      default: return "label label-white";
    }
  }
}
