import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Pagination } from 'src/app/class/Pagination';
import { UserRegistrationQueue } from 'src/app/interfaces/UserRegistrationQueue';
import { UserRegistrationQueueService } from 'src/app/services/user-registration-queue.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UsersRegistrationDetailsComponent } from './pages/users-registration-details/users-registration-details.component';
import { UsersRegistrationApproveComponent } from './pages/users-registration-approve/users-registration-approve.component';

@Component({
  selector: 'app-users-registration-queue',
  standalone: true,
  imports: [SharedModule, RouterModule, CommonModule, MatPaginatorModule],
  templateUrl: './users-registration-queue.component.html',
  styleUrl: './users-registration-queue.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class UsersRegistrationQueueComponent {

  usersRegistrationQueue: UserRegistrationQueue[];
  pagination = new Pagination();

  constructor(private userRegistrationQueueService: UserRegistrationQueueService, private datePipe: DatePipe, private modal: NgbModal) {
    this.userRegistrationQueueService.getPaginated(this.pagination).subscribe((response) => {
      this.usersRegistrationQueue = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }

  getStatusFormatted(status: string) {
    return this.userRegistrationQueueService.getStatus(status);
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

  getDateFormatted(date: string) {
    const formato = 'dd \'de\' MMMM \'de\' yyyy'
    const dataFormatada = this.datePipe.transform(date, formato, 'pt-br');
    return dataFormatada;
  }

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pagination.search = input.value;
    this.pagination.page = 1;
    this.refreshQueue();
  }

  refreshQueue() {
    this.userRegistrationQueueService.getPaginated(this.pagination).subscribe((response) => {
      this.usersRegistrationQueue = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }

  handlePageEvent(event: PageEvent) {
    
    const previousPageSize = this.pagination.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;

    if (event.pageSize !== previousPageSize) {
      this.pagination.page = 1;
    }

    this.refreshQueue();
  }

  openDetails(item: UserRegistrationQueue) {
    const style = { size: 'lg' };
    let modalRef = this.modal.open(UsersRegistrationDetailsComponent, style);
    modalRef.componentInstance.userRegistrationQueue = item;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.refreshQueue();
    });
  }

  approve(item: UserRegistrationQueue, event: MouseEvent) {
    event.stopPropagation();

    const style = { size: 'lg' };
    let modalRef = this.modal.open(UsersRegistrationApproveComponent, style);
    modalRef.componentInstance.userRegistrationQueue = item;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.refreshQueue();
    });
  }
}
