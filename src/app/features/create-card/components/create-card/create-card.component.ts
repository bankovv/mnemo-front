import { Component, inject } from '@angular/core';
import { OpenedDeckService } from '../../../opened-deck/services/opened-deck.service';
import { DeckModel } from '../../../../shared/models/decks/deck.model';
import { CardModel } from '../../../../shared/models/decks/card.model';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.css'
})
export class CreateCardComponent {

  private deckService = inject(OpenedDeckService);

  public deck!: DeckModel;
  public card!: CardModel;

  constructor() {

    this.deckService.onDeckChange(deck => this.deck = deck);

    this.card = {
      cardId: -1,
      wordsOriginal: [],
      wordsTranslate: [],
      audioUrls: undefined!,
      videoUrls: undefined!,
      createdAt: new Date()
    }

  }

}