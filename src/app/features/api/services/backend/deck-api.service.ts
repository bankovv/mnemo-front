import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_CONFIG } from '../../config/api-config';
import { Observable } from 'rxjs';
import { DecksPageResponse } from '../../dtos/decks/decks-page-response.dto';
import { DeckResponse } from '../../dtos/decks/deck-response.dto';
import { CardsResponse } from '../../dtos/cards/cards-response.dto';
import { DeckCreateResponse } from '../../dtos/decks/create/deck-create-response.dto';
import { DeckCreateRequest } from '../../dtos/decks/create/deck-create-request.dto';
import { CardCreateRequest } from '../../dtos/cards/create/card-create-request.dto';
import { CardCreateResponse } from '../../dtos/cards/create/card-create-response.dto';

@Injectable({
  providedIn: 'root'
})
export class DeckApiService {

  private http = inject(HttpClient);
  private apiurl = API_CONFIG.decksUrl;

  public getDecksPage(page: number, size: number): Observable<DecksPageResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<DecksPageResponse>(this.apiurl);
  }

  public getDeck(deckPublicId: string): Observable<DeckResponse> {
    return this.http.get<DeckResponse>(`${this.apiurl}/${deckPublicId}`);
  }

  public getDeckCards(deckPublicId: string): Observable<CardsResponse> {
    return this.http.get<CardsResponse>(`${this.apiurl}/${deckPublicId}/cards`);
  }

  public createDeck(request: DeckCreateRequest): Observable<DeckCreateResponse> {
    return this.http.post<DeckCreateResponse>(`${this.apiurl}`, request, { withCredentials: true });
  }

  public createCard(request: CardCreateRequest): Observable<CardCreateResponse> {
    return this.http.post<CardCreateResponse>(`${this.apiurl}/${request.deckPublicId}/cards`, request, { withCredentials: true });
  }

}