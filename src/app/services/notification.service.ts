import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pagination } from '../class/Pagination';
import { Observable } from 'rxjs';
import { differenceInDays, differenceInHours, parseISO } from 'date-fns';
import { Notification } from '../interfaces/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = environment.apiBaseUrl + '/notifications';

  constructor(private httpClient: HttpClient) { }

  GetMyPaginated(pagination: Pagination): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/my?page=${pagination.page}&pageSize=${pagination.pageSize}`);
  }

  GetForAdminPaginated(pagination: Pagination) : Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}?page=${pagination.page}&pageSize=${pagination.pageSize}`);
  }

  GetById(id: string): Observable<Notification> {
    return this.httpClient.get<Notification>(`${this.baseUrl}/${id}`);
  }

  Create(notification: Notification): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}`, notification);
  }

  Delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }

  FormatedCreatedAt(createdAt: string): string {
    const now = new Date();
    const parsedCreatedAt = parseISO(createdAt);

    const hoursDifference = differenceInHours(now, parsedCreatedAt);
    const daysDifference = differenceInDays(now, parsedCreatedAt);

    if (hoursDifference > 24) {
      return daysDifference === 1 ? `há 1 dia` : `há ${daysDifference} dias`;
    } else {
      if (hoursDifference <= 0) {
        return "agora mesmo";
      }
      return hoursDifference === 1 ? `há 1 hora` : `há ${hoursDifference} horas`;
    }
  }

}