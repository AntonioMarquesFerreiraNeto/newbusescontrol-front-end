import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/interfaces/Customer';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsCustomerComponent } from './details-customer/details-customer.component';
import { Pagination } from 'src/app/class/Pagination';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatPaginatorModule, SharedModule, RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class CustomerComponent implements OnInit {

  customers: Customer[];
  pagination = new Pagination;
  tableMsg = '';

  constructor(private customerService: CustomerService, private datePipe: DatePipe, private modal: NgbModal) { }

  ngOnInit(): void {
    this.customerService.GetPaginated(this.pagination).subscribe(response => {
      this.customers = response.response,
        this.pagination.totalSize = response.totalSize
    });

    this.tableMsg = this.customers?.length == 0 ? 'Nenhum registro encontrado' : '';
  }

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pagination.search = input.value;
    this.pagination.page = 1;

    this.customerService.GetPaginated(this.pagination).subscribe(response => {
      this.customers = response.response,
        this.pagination.totalSize = response.totalSize
    });
  }

  handlePageEvent(event: PageEvent) {
    const previousPageSize = this.pagination.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;

    if (event.pageSize !== previousPageSize) {
      this.pagination.page = 1;
    }

    this.refreshCustomers();
  }

  refreshCustomers() {
    this.customerService.GetPaginated(this.pagination).subscribe(response => {
      this.customers = response.response,
        this.pagination.totalSize = response.totalSize
    });
  }

  getLabelActive(status: boolean) {
    return status ? 'label-blue' : 'label-pink'
  }

  getDetailActive(status: boolean) {
    return status ? 'Cliente Ativo' : 'Cliente Inativo';
  }

  getLabelType(type: string) {
    return type == 'NaturalPerson' ? 'label-blue' : 'label-pink'
  }

  getDetailType(type: string) {
    return type == 'NaturalPerson' ? 'Pessoa Física' : 'Pessoa Jurídica';
  }

  dateFormatted(date: string) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  phoneNumberFormatted(phoneNumber: string) {
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  openDetails(id: string) {
    const style = { size: 'lg' };
    const modalRf = this.modal.open(DetailsCustomerComponent, style);
    modalRf.componentInstance.id = id;
    modalRf.componentInstance.onSubmitted.subscribe(() => {
      this.refreshCustomers();
    });
  }
}
