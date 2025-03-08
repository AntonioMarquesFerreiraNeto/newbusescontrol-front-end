import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Pagination } from 'src/app/class/Pagination';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AccessManagerDetailsComponent } from './access-manager-details/access-manager-details.component';

@Component({
  selector: 'app-access-manager',
  standalone: true,
  imports: [SharedModule, CommonModule, MatPaginatorModule, RouterModule],
  templateUrl: './access-manager.component.html',
  styleUrl: './access-manager.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class AccessManagerComponent {

  users: User[];
  pagination = new Pagination;

  constructor(private userService: UserService, private datePipe: DatePipe, private modal: NgbModal) {
    this.refreshUsers();
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

  phoneNumberFormatted(phoneNumber: string) {
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  getDateFormatted(date: string) {
    const formato = 'dd \'de\' MMMM \'de\' yyyy'
    const dataFormatada = this.datePipe.transform(date, formato, 'pt-br');
    return dataFormatada;
  }

  getLabelStatus(status: string) {
    return status == 'Active' ? 'label-blue' : 'label-pink'
  }

  getDetailStatus(status: string) {
    return status == 'Active' ? 'Ativo' : 'Inativo';
  }

  refreshUsers() {
    this.userService.getPaginated(this.pagination).subscribe((response) => {
      this.users = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pagination.search = input.value;
    this.pagination.page = 1;

    this.refreshUsers();
  }

  handlePageEvent(event: PageEvent) {
    const previousPageSize = this.pagination.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;

    if (event.pageSize !== previousPageSize) {
      this.pagination.page = 1;
    }

    this.refreshUsers();
  }

  openDetails(user: User, event: MouseEvent) {
    event.stopPropagation();
    const style = { size: 'md' };
    let modalRef = this.modal.open(AccessManagerDetailsComponent, style);
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.refreshUsers();
    });
  }
}
