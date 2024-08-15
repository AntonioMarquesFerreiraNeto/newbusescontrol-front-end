import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Webhook } from 'src/app/interfaces/Webhook';
import { WebhookService } from 'src/app/services/webhook.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { WebhookDetailsComponent } from './pages/webhook-details/webhook-details.component';

@Component({
  selector: 'app-webhooks',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './webhooks.component.html',
  styleUrl: './webhooks.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class WebhooksComponent {

  webhooks: Webhook[];

  constructor(private webhookService: WebhookService, private modal: NgbModal) {
    this.webhookService.GetAll().subscribe((response) => {
      this.webhooks = response.response;
    });
  }

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.webhookService.GetAll(value).subscribe((response) => {
      this.webhooks = response.response;
    });
  }

  getLabelStatus(enable: boolean) {
    return enable ? 'label-blue' : 'label-pink'
  }

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

  openDetails(id: string) {
    const style = { size: 'lg' };
    var modalRef = this.modal.open(WebhookDetailsComponent, style);
    modalRef.componentInstance.webhookId = id;

    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.webhookService.GetAll().subscribe((response) => {
        this.webhooks = response.response;
      });
    });
  }
}
