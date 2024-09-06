import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from '../interfaces/Supplier';
import { Pagination } from '../class/Pagination';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private baseUrl = environment.apiBaseUrl + '/suppliers';

  constructor(private httpClient: HttpClient) { }

  GetById(id: string) : Observable<Supplier> {
    return this.httpClient.get<Supplier>(`${this.baseUrl}/suppliers/${id}`);
  }

  GetPaginated(pagination: Pagination) : Observable<any> {
    var url = this.baseUrl + `?page=${pagination.page}&pageSize=${pagination.pageSize}`;
    if (pagination.search.length != 0) {
      url = url + `&search=${pagination.search}`
    }

    return this.httpClient.get<any>(url);
  }

  Create(supplier: Supplier) : Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, supplier);
  }

  Update(id: string, supplier: Supplier) : Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, supplier);
  }

  ToggleActive(id: string) : Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/active/${id}`, null);
  }
}
