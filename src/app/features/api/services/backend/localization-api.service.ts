import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_CONFIG } from '../../config/api-config';
import { LocalesDto } from '../../dtos/localization/locales.dto';
import { LocalizationDto } from '../../dtos/localization/localization.dto';

@Injectable({
  providedIn: 'root'
})
export class LocalizationApiService {

  private http = inject(HttpClient);
  private apiUrl = API_CONFIG.localizationUrl;

  public getTextTranslations(locale: string): Observable<Map<string, string>> {
    return this.http.get<LocalizationDto>(this.apiUrl + '/translations/' + locale).pipe(
      map(resp => new Map(Object.entries(resp.textTranslations)))
    );
  }

  public getLocales(): Observable<Array<string>> {
    return this.http.get<LocalesDto>(this.apiUrl + '/locales').pipe(
      map(resp => resp.locales)
    );
  }

}