import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SupportTicketMessage } from '../interfaces/SupportTicketMessage';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketMessageService {

  private urlBase = `${environment.apiBaseUrl}/support/ticket`;
  
  constructor(private httpClient: HttpClient) { }

  FindByTicket(ticketId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.urlBase}/${ticketId}/messages`);
  }

  Create(ticketId: string, request: SupportTicketMessage): Observable<any> {
    return this.httpClient.post<any>(`${this.urlBase}/${ticketId}/messages`, request);
  }
}
