import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DeckApiService } from '../backend/deck-api.service';
import { DecksPageModel } from '../../../../shared/models/decks/decks-page.model';
import { DecksPageResponse } from '../../dtos/decks/decks-page-response.dto';
import { DeckModel } from '../../../../shared/models/decks/deck.model';
import { CardModel } from '../../../../shared/models/decks/card.model';
import { CardsResponse } from '../../dtos/decks/cards-response.dto';
import { DeckCreateResponse } from '../../dtos/decks/create/deck-create-response.dto';
import { DeckCreateRequest } from '../../dtos/decks/create/deck-create-request.dto';

@Injectable({
  providedIn: 'root'
})
export class DeckFacadeService {
  
  private deckApi = inject(DeckApiService);

  public getDecksPage(page: number, size: number): Observable<DecksPageModel> {
    return this.deckApi.getDecksPage(page, size).pipe(map(page => this.mapDecksPageDtoToModel(page)))
  }

  private mapDecksPageDtoToModel(dto: DecksPageResponse): DecksPageModel {
    return {
      ...dto,
      decks: dto.content
    }
  }

  public getDeck(deckPublicId: string): Observable<DeckModel> {
    return this.deckApi.getDeck(deckPublicId);
  }

  public getDeckCards(deckPublicId: string): Observable<CardModel[]> {
    return this.deckApi.getDeckCards(deckPublicId).pipe(map((resp: CardsResponse) => resp.cards));
  }

  public createDeck(deckName: string, deckPublicId: string, languageOriginalKey: string, languageTranslateKey: string): Observable<DeckCreateResponse> {
    const request: DeckCreateRequest = { deckName, deckPublicId, languageOriginalKey, languageTranslateKey };
    return this.deckApi.createDeck(request);
  }

}