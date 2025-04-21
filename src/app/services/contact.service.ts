import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../interfaces/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = environment.apiBaseUrl + '/contacts';

  constructor(private httpClient: HttpClient) { }

  Create(contact: Contact): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, contact);
  }
}
