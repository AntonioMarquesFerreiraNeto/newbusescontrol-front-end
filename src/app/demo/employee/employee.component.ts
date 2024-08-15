import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Pagination } from 'src/app/class/Pagination';
import { Employee } from 'src/app/interfaces/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [RouterModule, SharedModule, MatPaginatorModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class EmployeeComponent {

  pagination = new Pagination;
  employees: Employee[];

  constructor(private employeeService: EmployeeService, private datePipe: DatePipe) {
    this.employeeService.GetPaginated(this.pagination).subscribe((response) => {
      this.employees = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }

  typeFormattedEmployee(type: string) {
    switch (type) {
      case 'Admin':
        return 'Administrador';
      case 'Assistant':
        return 'Assistente';
      case 'SupportAgent':
        return 'Suporte';
      case 'Driver':
        return 'Motorista';
      default:
        return 'Não encontrado';
    }
  }

  dateFormatted(date: string) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  phoneNumberFormatted(phoneNumber: string) {
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  getLabelStatus(status: string) {
    return status == 'Active' ? 'label-blue' : 'label-pink'
  }

  getDetailStatus(status: string) {
    return status == 'Active' ? 'Ativo' : 'Inativo';
  }

  refreshEmployees() {
    this.employeeService.GetPaginated(this.pagination).subscribe((response) => {
      this.employees = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pagination.search = input.value;
    this.pagination.page = 1;
    this.refreshEmployees();
  }

  handlePageEvent(event: PageEvent) {
    const previousPageSize = this.pagination.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;

    if (event.pageSize !== previousPageSize) {
      this.pagination.page = 1;
    }

    this.refreshEmployees();
  }
}
