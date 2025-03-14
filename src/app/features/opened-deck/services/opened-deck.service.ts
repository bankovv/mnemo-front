import { inject, Injectable, signal } from '@angular/core';
import { DeckModel } from '../../../shared/models/decks/deck.model';
import { DeckFacadeService } from '../../api/services/facades/deck-facade.service';
import { CardModel } from '../../../shared/models/decks/card.model';
import { RoutingService } from '../../../core/services/routing.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenedDeckService {

  private deckFacade = inject(DeckFacadeService);
  private routingService = inject(RoutingService);

  private deckChangeListeners: ((deck: DeckModel, cards: CardModel[]) => void)[] = [];
  private currentCardChangeListeners: ((card: CardModel) => void)[] = [];

  private _currentDeck!: DeckModel;
  private _cards!: CardModel[];

  private _currentCard!: CardModel;
  private _isOriginalSideDefault = true;
  private _isOnOriginalSide = signal(this._isOriginalSideDefault);
  private _currentCardIndex: number = 0;

  constructor() {
    this.routingService.onRouteChange(ev => {
      const url = ev.url.split('/');
      if (url[1] === 'deck') {
        this.setCurrentDeck(url[2]);
      }
    });
  }

 public nextCard() {
    this.isOnOriginalSide = this._isOriginalSideDefault;
    this._currentCardIndex = this._currentCardIndex >= this._cards.length - 1 ? 0 : this._currentCardIndex + 1;
    this.updateCurrentCard();
  }

  public prevCard() {
    this.isOnOriginalSide = this._isOriginalSideDefault;
    this._currentCardIndex = this._currentCardIndex <= 0 ? this.cards.length - 1 : this._currentCardIndex - 1;
    this.updateCurrentCard();
  }

  private updateCurrentCard() {
    this.currentCard = this.cards[this._currentCardIndex];
  }

  // Listeners

  public onDeckChange(onChange: (deck: DeckModel, cards: CardModel[]) => void) {
    this.deckChangeListeners.push(onChange);
  }

  public offDeckChange(onChange: (deck: DeckModel, cards: CardModel[]) => void) {
    const index = this.deckChangeListeners.indexOf(onChange);
    this.deckChangeListeners.splice(index, 1);
  }

  public onCurrentCardChange(onChange: (card: CardModel) => void) {
    this.currentCardChangeListeners.push(onChange);
  }

  public offCurrentCardChange(onChange: (card: CardModel) => void) {
    const index = this.currentCardChangeListeners.indexOf(onChange);
    this.currentCardChangeListeners.splice(index, 1);
  }

  // Setters

  public async setCurrentDeck(deckPublicId: string): Promise<void> {
    this._currentDeck = await firstValueFrom(this.deckFacade.getDeck(deckPublicId));
    this._cards = await firstValueFrom(this.deckFacade.getDeckCards(deckPublicId));
    this.updateCurrentCard();
    this.deckChangeListeners.forEach(onChange => onChange(this._currentDeck, this._cards));
  }

  public set currentCard(currentCard: CardModel) {
    this._currentCard = currentCard;
    this.currentCardChangeListeners.forEach(onChange => onChange(this._currentCard));
  }

  public set isOnOriginalSide(original: boolean) {
    this._isOnOriginalSide.set(original);
  }

  // Getters

  public get currentDeck(): DeckModel {
    return this._currentDeck;
  }

  public get cards(): CardModel[] {
    return this._cards;
  }

  public get currentCard(): CardModel {
    return this._currentCard;
  }

  public get isOnOriginalSide(): boolean {
    return this._isOnOriginalSide();
  }

  public get isOnOriginalSideSignal() {
    return this._isOnOriginalSide;
  }

  public get currentWords(): string[] {
    return this.isOnOriginalSide ? this._currentCard.wordsOriginal : this._currentCard.wordsTranslate;
  }

  public get currentCardIndex() {
    return this._currentCardIndex;
  }

}