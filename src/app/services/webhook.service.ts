import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Webhook } from '../interfaces/Webhook';

@Injectable({
  providedIn: 'root'
})
export class WebhookService {

  private baseUrl = environment.apiBaseUrl + '/webhook';

  private paymentWebhookEvents: string[] = [
    'PAYMENT_AUTHORIZED',
    'PAYMENT_APPROVED_BY_RISK_ANALYSIS',
    'PAYMENT_CREATED',
    'PAYMENT_CONFIRMED',
    'PAYMENT_ANTICIPATED',
    'PAYMENT_DELETED',
    'PAYMENT_REFUNDED',
    'PAYMENT_REFUND_DENIED',
    'PAYMENT_CHARGEBACK_REQUESTED',
    'PAYMENT_AWAITING_CHARGEBACK_REVERSAL',
    'PAYMENT_DUNNING_REQUESTED',
    'PAYMENT_CHECKOUT_VIEWED',
    'PAYMENT_PARTIALLY_REFUNDED',
    'PAYMENT_AWAITING_RISK_ANALYSIS',
    'PAYMENT_REPROVED_BY_RISK_ANALYSIS',
    'PAYMENT_UPDATED',
    'PAYMENT_RECEIVED',
    'PAYMENT_OVERDUE',
    'PAYMENT_RESTORED',
    'PAYMENT_REFUND_IN_PROGRESS',
    'PAYMENT_RECEIVED_IN_CASH_UNDONE',
    'PAYMENT_CHARGEBACK_DISPUTE',
    'PAYMENT_DUNNING_RECEIVED',
    'PAYMENT_BANK_SLIP_VIEWED',
    'PAYMENT_CREDIT_CARD_CAPTURE_REFUSED'
];

  constructor(private httpClient: HttpClient) { }

  GetAllEvents() {
    return this.paymentWebhookEvents;
  }

  GetAll(search: string = ''): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}?search=${search}`);
  }

  GetById(id: string): Observable<Webhook> {
    return this.httpClient.get<Webhook>(`${this.baseUrl}/${id}`);
  }

  Create(webhook: Webhook): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, webhook);
  }

  Delete(id: string): Observable<Webhook> {
    return this.httpClient.delete<Webhook>(`${this.baseUrl}/${id}`);
  }
}
