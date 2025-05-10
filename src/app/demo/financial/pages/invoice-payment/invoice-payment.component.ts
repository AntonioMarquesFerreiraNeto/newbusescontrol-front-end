import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Invoice } from 'src/app/interfaces/Invoice';
import { CommonService } from 'src/app/services/common.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { InvoiceRequestPayment } from 'src/app/interfaces/InvoiceRequestPayment';
import { HttpErrorResponse } from '@angular/common/http';
import { SwalFireService } from 'src/app/services/swal-fire.service';

@Component({
  selector: 'app-invoice-payment',
  standalone: true,
  imports: [SharedModule, RouterModule, NgxMaskDirective, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [provideNgxMask()],
  templateUrl: './invoice-payment.component.html',
  styleUrl: './invoice-payment.component.scss'
})
export class InvoicePaymentComponent implements OnInit {
  financialId: string;
  invoiceId: string;
  invoice: any;
  invoicePayment: FormGroup;
  public cpfCnpjMask: string = '000.000.000-00';

  ngOnInit(): void {
    this.financialId = this.route.snapshot.paramMap.get('financialid');
    this.invoiceId = this.route.snapshot.paramMap.get('invoiceid');

    this.invoice = JSON.parse(sessionStorage.getItem(this.invoiceId));
    if (this.invoice == null) {
      this.snackbarService.Open('Fatura não encontrada.');
      this.router.navigate([`/financials/${this.financialId}/invoices`]);
    }

    this.invoicePayment = new FormGroup({
      paymentMethod: new FormControl('CreditCard', Validators.required),
      holderName: new FormControl(this.invoice.customerName ?? ''),
      holderCpfCnpj: new FormControl(this.invoice.customerDocument ?? ''),
      holderEmail: new FormControl(this.invoice.customerEmail ?? ''),
      holderMobilePhone: new FormControl(this.invoice.customerPhoneNumber ?? ''),
      holderPostalCode: new FormControl(''),
      holderAddressNumber: new FormControl(this.invoice.customerHomeNumber ?? ''),
      number: new FormControl(''),
      expiryMonth: new FormControl(''),
      expiryYear: new FormControl(''),
      securityCode: new FormControl('')
    });    
  }

  constructor(private route: ActivatedRoute, private router: Router, private snackbarService: SnackbarService, public commonService: CommonService, private invoiceService: InvoiceService, private swalFireService: SwalFireService) { }

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

  onDocumentInput(): void {
    const value = this.invoicePayment.get('holderCpfCnpj')?.value?.replace(/\D/g, '') || '';
  
    this.cpfCnpjMask = value.length > 11
      ? '00.000.000/0000-00' 
      : '000.000.000-00';
  }

  submit() {
    if(this.invoicePayment.invalid){
      return;
    }

    const data : InvoiceRequestPayment = this.invoicePayment.value;

    this.swalFireService.SwalLoading('Por favor, aguarde enquanto processamos seu pagamento...');

    this.invoiceService.Payment(this.invoiceId, data).subscribe({
      next: (response) => {
        this.swalFireService.Close();
        this.swalFireService.SwalSuccess(response.message, () => {
          //Fazer as tratativas de PIX, Cartão de Crédito ou "apenas contabilize" aqui.
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.Close();
        this.snackbarService.Open(error.error.detail);
      }
    });
  }
}
