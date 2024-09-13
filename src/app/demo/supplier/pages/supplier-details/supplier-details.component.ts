import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Supplier } from 'src/app/interfaces/Supplier';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-supplier-details',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective, SharedModule],
  providers: [provideNgxMask()],
  templateUrl: './supplier-details.component.html',
  styleUrl: './supplier-details.component.scss'
})
export class SupplierDetailsComponent implements OnInit {
  @Input() id: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  supplier: Supplier;
  actionTxt: string;

  constructor(private modal: NgbActiveModal, private snackbarService: SnackbarService, private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.supplierService.GetById(this.id).subscribe({
      next: (response) => {
        this.supplier = response;
        this.actionTxt = this.supplier.active ? 'Inativar' : 'Ativar';
      },
      error: (error: HttpErrorResponse) => {
        this.modal.close();
        this.snackbarService.Open(error.error.detail);
      }
    });
  }
  
  getActive() {
    return this.supplier.active ? 'Ativo' : 'Inativo';
  }

  phoneNumberFormatted() {
    return this.supplier.phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  getCnpjFormatted() {
    return this.supplier.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  close() {
    this.modal.close();
  }

  submit() {
    this.supplierService.ToggleActive(this.supplier.id).subscribe({
      next: () => {
        this.snackbarService.Open('Status do fornecedor atualizado com sucesso!');
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
