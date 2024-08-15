import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Notification } from 'src/app/interfaces/Notification';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-detail',
  standalone: true,
  imports: [],
  templateUrl: './notification-detail.component.html',
  styleUrl: './notification-detail.component.scss'
})
export class NotificationDetailComponent implements OnInit{
  @Input() notificationId: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  notification: Notification;
  
  constructor(private modal: NgbActiveModal, private notificationService: NotificationService, private snackbarService: SnackbarService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.notificationService.GetById(this.notificationId).subscribe({
      next: (response) => {
        this.notification = response;
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.modal.close();
      }
    });
  }

  getSenderType(senderType: string) {
    return senderType == 'System' ? 'Enviada pelo sistema' : 'Enviada por funcionário';
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
    const formato = 'dd \'de\' MMMM \'de\' yyyy \'às\' HH:mm\'h\'';
    const dataFormatada = this.datePipe.transform(date, formato, 'pt-br');
    return dataFormatada;
  }

  getSender() {
    return this.notification.sender ? this.notification.sender.name : 'Buses Control - Agent'
  }

  close() {
    this.modal.close();
  }

  submit() {
    this.notificationService.Delete(this.notificationId).subscribe({
      next: () => {
        this.snackbarService.Open('Notificação deletada com sucesso!');
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
