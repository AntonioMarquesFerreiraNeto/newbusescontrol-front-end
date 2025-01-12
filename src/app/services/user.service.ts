import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { Pagination } from '../class/Pagination';
import { UserResetPasswordStepCode } from '../interfaces/UserResetPasswordStepCode';
import { UserResetPasswordStepResetToken } from '../interfaces/UserResetPasswordStepResetToken';
import { UserResetPasswordStepResetTokenResponse } from '../interfaces/helpers/UserResetPasswordStepResetTokenResponse';
import { UserResetPasswordStepNewPassword } from '../interfaces/UserResetPasswordStepNewPassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiBaseUrl + '/users';

  constructor(private httpClient: HttpClient) { }

  getPaginated(pagination: Pagination): Observable<any> {
    let url = this.baseUrl + `/find?page=${pagination.page}&pageSize=${pagination.pageSize}`;
    if (pagination.search.length != 0) {
      url = url + `&search=${pagination.search}`;
    }

    return this.httpClient.get<any>(`${url}`);
  }

  getMyProfile(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/my/profile`);
  }

  toggleActive(id: string, status: string): Observable<any> {
    const request = { status };
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}/active`, request);
  }

  resetPasswordStepCode(request: UserResetPasswordStepCode): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/reset-password/step-code`, request);
  }

  resetPasswordStepResetToken(request: UserResetPasswordStepResetToken): Observable<UserResetPasswordStepResetTokenResponse>{
    return this.httpClient.patch<UserResetPasswordStepResetTokenResponse>(`${this.baseUrl}/reset-password/step-reset-token`, request);
  }

  resetPasswordStepNewPassword(request: UserResetPasswordStepNewPassword): Observable<any>{
    return this.httpClient.patch<any>(`${this.baseUrl}/reset-password/step-new-password`, request);
  }
}
