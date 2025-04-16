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

  FindByPagination(pagination: Pagination): Observable <any> {
    var url = this.urlBase + `?page=${pagination.page}&pageSize=${pagination.pageSize}`;
    if (pagination.filter?.length != 0) {
      url += `&status=${pagination.filter}`;
    }

    return this.httpClient.get<any>(url);
  }

  GetById(id: string) {
    return this.httpClient.get<any>(`${this.urlBase}/${id}`);
  }

  Create(request: SupportTicket):Observable<any> {
    return this.httpClient.post<any>(`${this.urlBase}`, request);
  }
}
