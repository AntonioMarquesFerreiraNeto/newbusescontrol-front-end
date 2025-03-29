import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SupportTicket } from '../interfaces/SupportTicket';
import { Observable } from 'rxjs';
import { Pagination } from '../class/Pagination';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketService {

  private urlBase = `${environment.apiBaseUrl}/support/tickets`;

  constructor(private httpClient: HttpClient) { }

  FindByPagination(request: Pagination): Observable <any> {
    return this.httpClient.get<any>(`${this.urlBase}?page=${request.page}&pageSize=${request.pageSize}`);
  }

  GetById(id: string) {
    return this.httpClient.get<any>(`${this.urlBase}/${id}`);
  }

  Create(request: SupportTicket):Observable<any> {
    return this.httpClient.post<any>(`${this.urlBase}`, request);
  }
}
