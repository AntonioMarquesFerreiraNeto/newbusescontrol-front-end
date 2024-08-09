import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/Customer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../class/Pagination';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = environment.apiBaseUrl + '/customer';

  constructor(private httpClient: HttpClient) { }

  GetPaginated(pagination: Pagination): Observable<any> {
    var url = this.baseUrl + `?page=${pagination.page}&pageSize=${pagination.pageSize}`;
    if (pagination.search.length != 0) {
      url = url + `&search=${pagination.search}`
    }

    return this.httpClient.get<any>(url);
  }

  GetById(id: string): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.baseUrl}/${id}`);
  }

  Create(customer: Customer): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, customer);
  }

  Update(id: string, customer: Customer): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, customer);
  }

  ToggleActive(id: string): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}/active`, null);
  }
}
