import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Pagination } from 'src/app/class/Pagination';
import { Notification } from 'src/app/interfaces/Notification';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NotificationDetailComponent } from './pages/notification-detail/notification-detail.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [RouterModule, SharedModule, MatPaginatorModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class NotificationComponent {

  notifications: Notification[];
  pagination = new Pagination;

  constructor(private notificationService: NotificationService, private modal: NgbModal, private datePipe: DatePipe) {
    this.notificationService.GetForAdminPaginated(this.pagination).subscribe((response) => {
      this.notifications = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }

  getSenderType(senderType: string) {
    return senderType == 'System' ? 'Enviada pelo sistema' : 'Enviada por Funcionário';
  }

  getAccessLevel(accessLevel: string) {
    switch (accessLevel) {
      case 'Public':
        return 'Para Todos'
      case 'Admin':
        return 'Para Administradores';
      case 'Assistant':
        return 'Para Assistentes';
      default:
        return 'Não encontrado';
    }
  }

  getDateFormated(date: string) {
    const formato = 'dd \'de\' MMMM \'de\' yyyy'
    const dataFormatada = this.datePipe.transform(date, formato, 'pt-br');
    return dataFormatada;
  }

  openDetails(id: string) {
    const style = { size: 'lg' };
    var modalRef = this.modal.open(NotificationDetailComponent, style);

    console.log(id);

    modalRef.componentInstance.notificationId = id;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.refreshNotifications();
    });
  }

  handlePageEvent(event: PageEvent) {
    const previousPageSize = this.pagination.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;

    if (event.pageSize !== previousPageSize) {
      this.pagination.page = 1;
    }

    this.refreshNotifications();
  }

  refreshNotifications() {
    this.notificationService.GetForAdminPaginated(this.pagination).subscribe(response => {
      this.notifications = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }
}
