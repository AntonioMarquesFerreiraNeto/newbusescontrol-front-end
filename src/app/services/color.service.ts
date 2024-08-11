import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private baseUrl = environment.apiBaseUrl + '/colors';

  constructor(private httpClient: HttpClient) {

  }

  GetPaginated(page: number, pageSize: number, search: string = ''): Observable<any> {
    var url = `${this.baseUrl}?page=${page}&pageSize=${pageSize}`;
    if (search.length != 0) {
      url += `&search=${search}`;
    }

    return this.httpClient.get<any>(url);
  }
}
