import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api-config';
import { Observable } from 'rxjs';
import { CardVideosResponse } from '../../dtos/cards/card-videos-response.dto';

@Injectable({
  providedIn: 'root'
})
export class CardVideosApiService {

  private http = inject(HttpClient);
  private apiUrl = API_CONFIG.cardVideos;

  public getCardVideos(cardId: number): Observable<CardVideosResponse> {
    return this.http.get<CardVideosResponse>(`${this.apiUrl}/${cardId}`);
  }

}