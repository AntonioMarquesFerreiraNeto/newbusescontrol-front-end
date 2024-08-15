import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SettingPanel } from '../interfaces/SettingPanel';
import { Pagination } from '../class/Pagination';

@Injectable({
  providedIn: 'root'
})
export class SettingPanelService {
  
  private baseUrl = environment.apiBaseUrl + '/settings-panel';

  constructor(private httpClient: HttpClient) { }

  GetById(id: string): Observable<SettingPanel> {
    return this.httpClient.get<SettingPanel>(`${this.baseUrl}/${id}`);
  }

  GetPaginated(pagination: Pagination): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}?page=${pagination.page}&pageSize=${pagination.pageSize}`);
  }

  Create(settingPanel: SettingPanel): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, settingPanel);
  }

  Update(id: string, settingPanel: SettingPanel): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, settingPanel);
  }

  Delete(id: string): Observable<SettingPanel> {
    return this.httpClient.delete<SettingPanel>(`${this.baseUrl}/${id}`);
  }
}
