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

  CreateAsync(bus: Bus): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, bus);
  }
}
