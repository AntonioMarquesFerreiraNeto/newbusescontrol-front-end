import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InvoiceRequestPayment } from '../interfaces/InvoiceRequestPayment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseUrl = environment.apiBaseUrl + '/invoices'

  constructor(private httpClient: HttpClient) { }

  Payment(id: string, request: InvoiceRequestPayment) : Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/${id}/payment`, request);
  }
}
