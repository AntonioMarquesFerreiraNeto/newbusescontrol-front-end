import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-details-customer',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective, SharedModule],
  providers: [provideNgxMask()],
  templateUrl: './details-customer.component.html',
  styleUrl: './details-customer.component.scss'
})
export class DetailsCustomerComponent implements OnInit {
  @Input() id: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  customer: Customer;
  actionTxt: string;

  constructor(private modal: NgbActiveModal, private snackbarService: SnackbarService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.GetById(this.id).subscribe({
      next: (response) => {
        this.customer = response;
        this.actionTxt = this.customer.active ? 'Inativar' : 'Ativar';
      },
      error: (error: HttpErrorResponse) => {
        this.modal.close();
        this.snackbarService.Open(error.error.detail);
      }
    });
  }
  
  getActive() {
    return this.customer.active ? 'Ativo' : 'Inativo';
  }

  getType() {
    return this.customer.type == 'NaturalPerson' ? 'Pessoa física' : 'Pessoa jurídica';
  }

  getGender() {
    return this.customer.gender == 'Male' ? 'Masculino' : 'Feminino';
  }

  phoneNumberFormatted() {
    return this.customer.phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  getCpfFormatted() {
    return this.customer.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  getCnpjFormatted() {
    return this.customer.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  close() {
    this.modal.close();
  }

  submit() {
    this.customerService.ToggleActive(this.customer.id).subscribe({
      next: () => {
        this.snackbarService.Open('Status do cliente atualizado com sucesso!');
        this.modal.close();
        this.onSubmitted.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.modal.close();
      }
    });
  }
}
