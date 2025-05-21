import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CommonService } from 'src/app/services/common.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { InvoiceRequestPayment } from 'src/app/interfaces/InvoiceRequestPayment';
import { HttpErrorResponse } from '@angular/common/http';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { map } from 'rxjs';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentPixComponent } from './pages/payment-pix/payment-pix.component';
import { InvoicePix } from 'src/app/interfaces/InvoicePix';

@Component({
  selector: 'app-invoice-payment',
  standalone: true,
  imports: [SharedModule, RouterModule, NgxMaskDirective, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [provideNgxMask()],
  templateUrl: './invoice-payment.component.html',
  styleUrl: './invoice-payment.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class InvoicePaymentComponent implements OnInit {
  financialId: string;
  invoiceId: string;
  invoice: any;
  invoicePayment: FormGroup;

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
      holderName: new FormControl(this.invoice.customerName ?? '', Validators.required),
      holderCpfCnpj: new FormControl(this.invoice.customerDocument ?? '', Validators.required),
      holderEmail: new FormControl(this.invoice.customerEmail ?? '', Validators.required),
      holderMobilePhone: new FormControl(this.invoice.customerPhoneNumber ?? '', Validators.required),
      holderPostalCode: new FormControl('', Validators.required),
      holderAddressNumber: new FormControl(this.invoice.customerHomeNumber ?? '', Validators.required),
      number: new FormControl('', Validators.required),
      expiryMonth: new FormControl('', Validators.required),
      expiryYear: new FormControl('', Validators.required),
      securityCode: new FormControl('', Validators.required)
    });

    this.invoicePayment.get('paymentMethod')?.valueChanges.subscribe(value => {
      this.updateValidators(value);
    });

    this.updateValidators(this.invoicePayment.get('paymentMethod')?.value);
  }

  constructor(private route: ActivatedRoute, private router: Router, private snackbarService: SnackbarService, public commonService: CommonService, private invoiceService: InvoiceService, private swalFireService: SwalFireService, private modal: NgbModal) { }

  private updateValidators(paymentMethod: string): void {
    const isCreditCard = paymentMethod === 'CreditCard';

    const controlsToValidate = [
      'holderName',
      'holderCpfCnpj',
      'holderEmail',
      'holderMobilePhone',
      'holderPostalCode',
      'holderAddressNumber',
      'number',
      'expiryMonth',
      'expiryYear',
      'securityCode'
    ];

    controlsToValidate.forEach(controlName => {
      const control = this.invoicePayment.get(controlName);
      if (!control) return;

      if (isCreditCard) {
        control.setValidators(Validators.required);
      } else {
        control.clearValidators();
      }

      control.updateValueAndValidity();
    });
  }

  getStatusDescription(status) {
    switch (status) {
      case 'Pending': return "Pendente";
      case 'Paid': return "Paga";
      case 'OverDue': return "Atrasada";
      case 'Canceled': return "Cancelada";
      default: return "Não encontrado";
    }
  }

  getStatusLabel(status) {
    switch (status) {
      case 'Pending': return "label label-blue";
      case 'Paid': return "label label-green";
      case 'OverDue': return "label label-orange";
      case 'Canceled': return "label label-red";
      default: return "label label-white";
    }
  }

  getPaymentMethod(paymentMethod) {
    switch (paymentMethod) {
      case 'CreditCard': return "Cartão de crédito";
      case 'Pix': return "PIX";
      case 'JustCount': return "Apenas Contabilizado";
      default: return "Não encontrado";
    }
  }

  setPaymentMethod(paymentMethod: string) {
    this.invoicePayment.get('paymentMethod').setValue(paymentMethod);
  }

  submit() {
    if (this.invoicePayment.invalid) {
      return;
    }

    const data: InvoiceRequestPayment = {
      creditCard: this.invoicePayment.value,
      paymentMethod: this.invoicePayment.get('paymentMethod')?.value
    };

    this.swalFireService.SwalLoading('Por favor, aguarde enquanto processamos seu pagamento...');

    this.invoiceService.Payment(this.invoiceId, data).subscribe({
      next: (response) => {
        this.swalFireService.Close();
        this.swalFireService.SwalSuccess(response.message, () => {
          if (data.paymentMethod != 'PIX') {
            this.router.navigate([`/financials/${this.financialId}/invoices`]);
            return;
          }

          const invoicePix: InvoicePix = {
            message: response.message,
            encodedImage: response.pix.encodedImage,
            payload: response.pix.payload,
            expirationDate: response.pix.expirationDate
          };

          const modalPix = this.modal.open(PaymentPixComponent, {
            backdrop: 'static',
            size: 'md'
          });
          modalPix.componentInstance.invoicePix = invoicePix;
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.Close();
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }
}
