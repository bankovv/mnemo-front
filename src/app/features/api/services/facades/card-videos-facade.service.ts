import { inject, Injectable } from '@angular/core';
import { CardVideosApiService } from '../backend/card-videos-api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardVideosFacadeService {

  private api = inject(CardVideosApiService);

  public getVideos(cardId: number): Observable<string[]> {
    return this.api.getCardVideos(cardId).pipe(map(resp => resp.videos));
  }

}