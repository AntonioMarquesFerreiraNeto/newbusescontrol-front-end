import { CommonModule, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Webhook } from 'src/app/interfaces/Webhook';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { WebhookService } from 'src/app/services/webhook.service';

@Component({
  selector: 'app-webhook-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './webhook-details.component.html',
  styleUrl: './webhook-details.component.scss'
})
export class WebhookDetailsComponent implements OnInit{
  @Input() webhookId?: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  webhook: Webhook;

  ngOnInit(): void {
    this.webhookService.GetById(this.webhookId).subscribe({
      next: (response) => {
        this.webhook = response;
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.modal.close();
      }
    });
  }

  constructor(private webhookService: WebhookService, private snackbarService: SnackbarService, private modal: NgbActiveModal, private datePipe: DatePipe) { }

  getDetailStatus(enable: boolean) {
    return enable ? 'Habilitado' : 'Desabilitado';
  }

  getType(type: string) {
    switch (type) {
      case 'Received':
        return 'Recebido';
      case 'Refunded':
        return 'Estornado';
      case 'Chargeback':
        return 'Chargeback';
      default:
        return 'Tipo desconhecido';
    }
  }

  dateFormated(date: string) {
    if(!date)
    {
      return 'Não possui';
    }

    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  close() {
    this.modal.close();
  }

  submit() {
    this.webhookService.Delete(this.webhookId).subscribe({
      next: (response: any) => {
        this.snackbarService.Open(response.message)
        this.modal.close();
        this.onSubmitted.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.modal.close();
      }
    })
  }
}
