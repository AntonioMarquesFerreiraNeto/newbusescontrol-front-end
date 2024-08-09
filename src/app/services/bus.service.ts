import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../interfaces/Bus';
import { environment } from 'src/environments/environment';
import { Pagination } from '../class/Pagination';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private baseUrl = environment.apiBaseUrl + '/bus';

  constructor(private httpClient: HttpClient) {

  }

  GetPaginated(pagination: Pagination): Observable<any> {
    var url = `${this.baseUrl}/find?page=${pagination.page}&pageSize=${pagination.pageSize}`;
    if (pagination.search.length != 0) {
      url += `&search=${pagination.search}`;
    }

    return this.httpClient.get(url);
  }

  GetById(id: string): Observable<Bus> {
    return this.httpClient.get<Bus>(`${this.baseUrl}/${id}`);
  }

  Create(bus: Bus): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, bus);
  }

  Update(id: string, bus: Bus): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, bus);
  }

  ToggleActive(id: string) {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}/active`, null);
  }

  ToggleAvailability(id: string) {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}/availability`, null);
  }
}
