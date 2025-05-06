import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Financial } from 'src/app/interfaces/Financial';
import { HttpErrorResponse } from '@angular/common/http';
import { FinancialService } from 'src/app/services/financial.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { CommonService } from 'src/app/services/common.service';
import { Invoice } from 'src/app/interfaces/Invoice';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [NgSelectModule, CommonModule, SharedModule, RouterModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
  animations: [fadeInOnEnterAnimation()]
})
export class InvoicesComponent implements OnInit {
  financial: Financial;
  invoices: Invoice[];

  invoiceStatus = [
    { description: 'Pendente', value: 'Pending' },
    { description: 'Paga', value: 'Paid' },
    { description: 'Atrasada', value: 'OverDue' },
    { description: 'Cancelada', value: 'Canceled' }
  ]

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('financialid');

    this.financialService.GetById(id).subscribe({
      next: (response) => {
        this.financial = response;
        this.invoices = response.invoices;
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.router.navigate(['/financials']);
      }
    });
  }

  constructor(private financialService: FinancialService, private route: ActivatedRoute, private snackbarService: SnackbarService, private router: Router, public commmonService: CommonService) { }

  filter(event: Event) {
    const status = event != undefined || event != null ? String(event) : '';;
    if(status) {
      this.financial.invoices = [];
      this.financial.invoices = this.invoices.filter(x => x.status == status).map(x => x);
    } else {
      this.financial.invoices = this.invoices.map(x => x);
    }
  }

  redirectToInvoicePayment(invoiceId: string) {
    const invoice = this.financial.invoices.find(x => x.id == invoiceId);
    sessionStorage.setItem(invoiceId, JSON.stringify(invoice));

    this.router.navigate(['/financials/' + this.financial.id + '/invoices/' + invoiceId + '/payment']);
  }

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
