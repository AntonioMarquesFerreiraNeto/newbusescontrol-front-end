import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../interfaces/Bus';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private baseUrl = environment.apiBaseUrl + '/bus';

  constructor(private httpClient: HttpClient) {

  }

  GetPaginated(page: number, pageSize: number, search: string = ''): Observable<any> {
    var url = `${this.baseUrl}/find?page=${page}&pageSize=${pageSize}`;
    if (search.length != 0) {
      url += `&search=${search}`;
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
