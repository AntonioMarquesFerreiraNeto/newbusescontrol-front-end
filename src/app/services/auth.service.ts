import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiBaseUrl + '/login';

  constructor(private httpCliente: HttpClient) { }

  Login(login: Login): Observable<any> {
    return this.httpCliente.post<any>(this.baseUrl, login);
  }

  SetToken(token: string) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('logged', "true");

    window.location.href = "/dashboard";
  }

  Logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("logged");

    window.location.href = "/auth/signin";
  }
}
