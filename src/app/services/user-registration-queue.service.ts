import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../class/Pagination';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserRegistrationQueue } from '../interfaces/UserRegistrationQueue';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationQueueService {

  private baseUrl = environment.apiBaseUrl + '/users-registration-queue';

  statusList = [
    { value: 'Started', description: 'Iniciado' },
    { value: 'WaitingForPassword', description: 'Aguardando senha' },
    { value: 'Finished', description: 'Finalizado' },
    { value: 'Approved', description: 'Aprovado' }
  ]

  constructor(private httpClient: HttpClient) { }

  getStatus(value: string) {
    return this.statusList.find(x => x.value == value).description;
  }

  getPaginated(pagination: Pagination): Observable<any> {

    let url = this.baseUrl + `?page=${pagination.page}&pageSize=${pagination.pageSize}`;

    if (pagination.search.length != 0) {
      url += `&search=${pagination.search}`;
    }

    return this.httpClient.get<any>(url);
  }

  getById(id: string): Observable<UserRegistrationQueue> {
    return this.httpClient.get<UserRegistrationQueue>(`${this.baseUrl}/${id}`);
  }

  Create(createRequest: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, createRequest);
  }

  Approve(id: string): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}/approve`, null);
  }

  Delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}
