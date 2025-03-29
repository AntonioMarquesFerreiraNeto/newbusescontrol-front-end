import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { SupportTicket } from 'src/app/interfaces/SupportTicket';
import { SupportTicketMessage } from 'src/app/interfaces/SupportTicketMessage';
import { CommonService } from 'src/app/services/common.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SupportTicketMessageService } from 'src/app/services/support-ticket-message.service';
import { SupportTicketService } from 'src/app/services/support-ticket.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-suport-ticket-messages',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterModule],
  templateUrl: './suport-ticket-messages.component.html',
  styleUrl: './suport-ticket-messages.component.scss',
  animations: [fadeInOnEnterAnimation()]
})
export class SuportTicketMessagesComponent implements OnInit {
  formMessage: FormGroup;
  supportTicket: SupportTicket;
  messages: SupportTicketMessage[];

  constructor(private router: Router, private route: ActivatedRoute, private snackbarService: SnackbarService, private supportTicketService: SupportTicketService, private supportTicketMessageService: SupportTicketMessageService, public commomService: CommonService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.supportTicketService.GetById(id).subscribe({
      next: (response) => {
        this.supportTicket = response;

        this.supportTicketMessageService.FindByTicket(this.supportTicket.id).subscribe((response) => {
          this.messages = response;
          this.scrollToBottom();
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.router.navigate(['/support/tickets']);
      }
    });

    this.formMessage = new FormGroup({
      message: new FormControl('', Validators.required)
    });
  }

  scrollToBottom() {
    const container = document.querySelector('.body-message-scrool');
    if (container) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  }

  getStatusDescription(status: string) {
    switch (status) {
      case 'Open': return 'Aberto';
      case 'InProgress': return 'Em progresso';
      case 'Closed': return 'Fechado';
      case 'Canceled': return 'Cancelado';
      default: return 'Não encontrado';
    }
  }

  submit() {
    if (!this.formMessage.valid) {
      return;
    }

    const data: SupportTicketMessage = this.formMessage.value;

    this.supportTicketMessageService.Create(this.supportTicket.id, data).subscribe({
      next: (response) => {
        this.formMessage.reset();
        this.messages.push(response);
        this.scrollToBottom();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
      }
    });
  }
}
