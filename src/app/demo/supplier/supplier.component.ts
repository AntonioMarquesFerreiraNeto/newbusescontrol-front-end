import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Pagination } from 'src/app/class/Pagination';
import { Supplier } from 'src/app/interfaces/Supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SupplierDetailsComponent } from './pages/supplier-details/supplier-details.component';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [RouterModule, SharedModule, MatPaginatorModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class SupplierComponent {
  pagination = new Pagination;
  suppliers: Supplier[];

  constructor(private supplierService: SupplierService, private datePipe: DatePipe, private modal: NgbModal) {
    this.supplierService.GetPaginated(this.pagination).subscribe((response) => {
      this.suppliers = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }

  dateFormatted(date: string) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  phoneNumberFormatted(phoneNumber: string) {
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  getLabelStatus(active: boolean) {
    return active ? 'label-blue' : 'label-pink'
  }

  getDetailStatus(active: boolean) {
    return active ? 'Ativo' : 'Inativo';
  }

  cnpjFormatted(cnpj: string) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  openDetails(id: string) {
    const style = { size: 'lg' };
    const modalRf = this.modal.open(SupplierDetailsComponent, style);
    modalRf.componentInstance.id = id;
    modalRf.componentInstance.onSubmitted.subscribe(() => {
      this.refreshSuppliers();
    });
  }

  refreshSuppliers() {
    this.supplierService.GetPaginated(this.pagination).subscribe((response) => {
      this.suppliers = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pagination.search = input.value;
    this.pagination.page = 1;
    this.refreshSuppliers();
  }

  handlePageEvent(event: PageEvent) {
    const previousPageSize = this.pagination.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;

    if (event.pageSize !== previousPageSize) {
      this.pagination.page = 1;
    }

    this.refreshSuppliers();
  }
}
