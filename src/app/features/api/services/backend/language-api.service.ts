import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageApiService {

  private http = inject(HttpClient);
  private apiUrl = API_CONFIG.languagesUrl;

  public getAllLanguages(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

}