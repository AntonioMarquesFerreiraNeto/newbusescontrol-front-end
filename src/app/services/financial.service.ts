import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pagination } from '../class/Pagination';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Financial } from '../interfaces/Financial';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  private baseUrl = environment.apiBaseUrl + '/financials';
  constructor(private httpClient: HttpClient) { }

  GetPaginated(pagination: Pagination) : Observable<any> {
    let url = this.baseUrl + `?page=${pagination.page}&pageSize=${pagination.pageSize}`;
    if (pagination.search.length != 0) {
      url = url + `&search=${pagination.search}`
    }

    return this.httpClient.get<any>(url);
  }

  GetById(id: string) : Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
  }

  CreateExpense(financial: Financial) : Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/expense`, financial);
  }

  CreateRevenue(financial: Financial) : Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/revenue`, financial);
  }

  UpdateDetails(id: string, financial: Financial) : Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}/details`, financial);
  }
}
