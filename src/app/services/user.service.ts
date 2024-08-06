import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiBaseUrl + '/users';

  constructor(private httpClient: HttpClient) { }

  getMyProfile(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/my/profile`);
  }
}
