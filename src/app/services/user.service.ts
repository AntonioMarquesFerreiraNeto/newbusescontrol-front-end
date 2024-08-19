import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { Pagination } from '../class/Pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiBaseUrl + '/users';

  constructor(private httpClient: HttpClient) { }

  getPaginated(pagination: Pagination): Observable<any> 
  {
    let url = this.baseUrl + `/find?page=${pagination.page}&pageSize=${pagination.pageSize}`;
    if (pagination.search.length != 0) {
      url = url + `&search=${pagination.search}`;
    }

    return this.httpClient.get<any>(`${url}`);
  }

  getMyProfile(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/my/profile`);
  }

  toggleActive(id: string, status: string) : Observable<any> {
    const request = { status };
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}/active`, request);
  }
}
