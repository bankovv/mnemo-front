import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_CONFIG } from '../../config/api-config';
import { SessionInfoResponse } from '../../dtos/sessions/session-info-response.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionApiService {

  private http = inject(HttpClient);
  private apiUrl = API_CONFIG.sessionUrl;

  public sessionInfo(): Observable<SessionInfoResponse> {
    return this.http.get<SessionInfoResponse>(this.apiUrl, {withCredentials: true});
  }

}