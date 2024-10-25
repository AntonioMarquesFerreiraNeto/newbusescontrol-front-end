import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContractDescription } from '../interfaces/ContractDescription';
import { Observable } from 'rxjs';
import { Pagination } from '../class/Pagination';

@Injectable({
  providedIn: 'root'
})
export class ContractDescriptionService {

  private baseUrl = environment.apiBaseUrl + '/contract-descriptions'

  constructor(private httpClient: HttpClient) { }

  GetById(id: string) : Observable<ContractDescription> {
    return this.httpClient.get<ContractDescription>(`${this.baseUrl}/${id}`);
  }

  GetPaginated(pagination: Pagination) : Observable<any> {
    var url = this.baseUrl + `?page=${pagination.page}&pageSize=${pagination.pageSize}`;
    return this.httpClient.get<any>(url);
  }

  Create(supplier: ContractDescription) : Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, supplier);
  }

  Update(id: string, supplier: ContractDescription) : Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, supplier);
  }

  Delete(id: string) : Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}
