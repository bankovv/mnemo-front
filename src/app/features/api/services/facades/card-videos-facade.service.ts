import { inject, Injectable } from '@angular/core';
import { CardVideosApiService } from '../backend/card-videos-api.service';
import { map, Observable } from 'rxjs';
import { CardVideoCreateResponse } from '../../dtos/card-videos/card-video-create-response.dto';
import { CardVideoCreateRequest } from '../../dtos/card-videos/card-video-create-request.dto';

@Injectable({
  providedIn: 'root'
})
export class CardVideosFacadeService {

  private api = inject(CardVideosApiService);

  public getVideos(cardId: number): Observable<string[]> {
    return this.api.getCardVideos(cardId).pipe(map(resp => resp.videos));
  }

  public addVideo(cardId: number, deckPublicId: string, videoUrl: string): Observable<CardVideoCreateResponse> {

    const request: CardVideoCreateRequest = {
      deckPublicId: deckPublicId,
      videoUrl: videoUrl
    }

    return this.api.addVideo(request, cardId);

  }

}