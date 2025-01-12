import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = environment.apiBaseUrl + '/legal/entity/details';

  GetDetailsLegalEntity(cnpj: string) : Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}?cnpj=${cnpj}`);
  }
}
