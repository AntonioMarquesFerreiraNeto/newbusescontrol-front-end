import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contract } from '../interfaces/Contract';
import { Pagination } from '../class/Pagination';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private baseUrl = environment.apiBaseUrl + '/contracts';

  constructor(private httpClient: HttpClient) { }

  GetPaginated(pagination: Pagination): Observable<any> {
    var url = this.baseUrl + `?page=${pagination.page}&pageSize=${pagination.pageSize}`;
    if (pagination.filter?.length != 0) {
      url += `&status=${pagination.filter}`;
    }

    return this.httpClient.get<any>(url);
  }

  GetById(id: string): Observable<Contract> {
    return this.httpClient.get<Contract>(`${this.baseUrl}/${id}`);
  }

  Create(contract: Contract): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}`, contract);
  }

  Update(id: string, contract: Contract): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, contract);
  }

  GetPdfContract(id: string, customerId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}/customers/${customerId}/pdf-contract`);
  }

  StartProcessTermination(id: string, customerId: string) {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}/customers/${customerId}/start-process-termination`, null);
  }
}
