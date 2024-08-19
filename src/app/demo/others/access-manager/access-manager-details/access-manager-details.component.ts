import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { User } from 'src/app/interfaces/User';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-access-manager-details',
  standalone: true,
  imports: [NgxMaskDirective],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './access-manager-details.component.html',
  styleUrl: './access-manager-details.component.scss'
})
export class AccessManagerDetailsComponent implements OnInit {

  actionTxt: string;
  @Input() user: User;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService: UserService, private modal: NgbActiveModal, private snacbarService: SnackbarService) { }

  ngOnInit(): void {
    this.actionTxt = this.user.status == 'Active' ? 'Retirar acesso' : 'Conceder acesso';
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

  close() {
    this.modal.close();
  }

  submit() {
    this.userService.toggleActive(this.user.id, this.user.status).subscribe({
      next: () => {
        const message = this.user.status == 'Active' ? 'Acessos do usuário retirado com sucesso!' : 'Acessos do usuário concedido com sucesso!';
        this.snacbarService.Open(message);
        this.close();
        this.onSubmitted.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.snacbarService.Open(error.error.detail);
        this.close();
      }
    });
  }
}
