import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../interfaces/Color';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private baseUrl = environment.apiBaseUrl + '/colors';

  constructor(private httpClient: HttpClient) 
  { 

  }

  GetAll(): Observable<Color[]>{
    return this.httpClient.get<Color[]>(this.baseUrl);
  }
}
