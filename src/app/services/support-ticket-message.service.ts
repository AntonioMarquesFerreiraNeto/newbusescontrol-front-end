import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SupportTicketMessage } from '../interfaces/SupportTicketMessage';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketMessageService {
  private urlBase = `${environment.apiBaseUrl}/support/ticket`;
  private hubConnection!: signalR.HubConnection;
  private messageReceived$ = new Subject<SupportTicketMessage>();
  
  constructor(private httpClient: HttpClient) { }

  FindByTicket(ticketId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.urlBase}/${ticketId}/messages`);
  }

  Create(ticketId: string, request: SupportTicketMessage): Observable<any> {
    return this.httpClient.post<any>(`${this.urlBase}/${ticketId}/messages`, request);
  }

  ConnectToHub(ticketId: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseUrlWebSocket}/support?ticketId=${ticketId}&access_token=${localStorage.getItem('access_token')}`, {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start();

    this.hubConnection.on('ReceiveMessage', (message: SupportTicketMessage) => {
      this.messageReceived$.next(message);
    });
  }

  DisconnectHub(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  OnMessageReceived(): Observable<SupportTicketMessage> {
    return this.messageReceived$.asObservable();
  }
}
