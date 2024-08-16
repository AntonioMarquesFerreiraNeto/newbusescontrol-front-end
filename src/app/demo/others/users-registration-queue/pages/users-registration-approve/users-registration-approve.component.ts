import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRegistrationQueue } from 'src/app/interfaces/UserRegistrationQueue';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { UserRegistrationQueueService } from 'src/app/services/user-registration-queue.service';

@Component({
  selector: 'app-users-registration-approve',
  standalone: true,
  imports: [],
  templateUrl: './users-registration-approve.component.html',
  styleUrl: './users-registration-approve.component.scss'
})
export class UsersRegistrationApproveComponent {
  @Input() userRegistrationQueue!: UserRegistrationQueue;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(private datePipe: DatePipe, private modal: NgbActiveModal, private userRegistrationQueueService: UserRegistrationQueueService, private snackbarService: SnackbarService, private employeeService: EmployeeService) { }
  

  getStatusFormatted(status: string) {
    return this.userRegistrationQueueService.getStatus(status);
  }

  getTypeFormattedEmployee(type: string) {
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
  
  getDateFormated(date: string) {
    const formato = 'dd \'de\' MMMM \'de\' yyyy'
    const dataFormatada = this.datePipe.transform(date, formato, 'pt-br');
    return dataFormatada;
  }
  
  close() {
    this.modal.close();
  }

  submit() {
    this.userRegistrationQueueService.Approve(this.userRegistrationQueue.id).subscribe({
      next: (response) => {
        this.snackbarService.Open(response.message);
        this.close();
        this.onSubmitted.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.close();
      }
    });
  }
}
