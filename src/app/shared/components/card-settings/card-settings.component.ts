import { Component, Input } from '@angular/core';
import { DeckModel } from '../../models/decks/deck.model';
import { CardModel } from '../../models/decks/card.model';

@Component({
  selector: 'app-card-settings',
  templateUrl: './card-settings.component.html',
  styleUrl: './card-settings.component.css'
})
export class CardSettingsComponent {

  @Input('deck')
  public deck!: DeckModel;

  @Input('card')
  public card!: CardModel;

  constructor() {

    this.deck = {
      deckPublicId: 'lala',
      deckName: 'lala',
      languageOriginal: 'english',
      languageTranslate: 'russian',
      createdAt: undefined!,
      cardsCount: 2
    }

    this.card = {
      cardId: 111,
      wordsOriginal: ['Elaborate'],
      wordsTranslate: ['Разрабатывать', 'Продуманный'],
      videoUrls: [],
      audioUrls: [],
      createdAt: undefined!
    }

  }

}