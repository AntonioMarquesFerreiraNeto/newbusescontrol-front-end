import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../class/Pagination';
import { Employee } from '../interfaces/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.apiBaseUrl + '/employee';

  constructor(private httpClient: HttpClient) { }

  GetPaginated(pagination: Pagination): Observable<any> {
    var url = this.baseUrl + `?page=${pagination.page}&pageSize=${pagination.pageSize}`;
    if (pagination.search.length != 0) {
      url = url + `&search=${pagination.search}`
    }

    return this.httpClient.get<any>(url);
  }

  GetById(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`);
  }

  Create(employee: Employee): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, employee);
  }

  Update(id: string, employee: Employee): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, employee);
  }

  ToggleActive(id: string): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}/active`, null);
  }

  ToggleType(id: string, requestType: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}/type`, requestType);
  }
}
