import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { OpenedDeckService } from '../../../services/opened-deck.service';
import { DeckModel } from '../../../../../shared/models/decks/deck.model';
import { CardModel } from '../../../../../shared/models/decks/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  private deckService = inject(OpenedDeckService);

  public words: string[] = [];
  public isOnOriginalSide = this.deckService.isOnOriginalSideSignal;

  ngOnInit() {
    this.deckService.onDeckChange((deck: DeckModel, cards: CardModel[]) => this.updateWords());
    this.deckService.onCurrentCardChange((card: CardModel) => this.updateWords());
    this.updateWords();
  }

  public cardClicked() {
    this.isOnOriginalSide.set(!this.isOnOriginalSide());
    this.updateWords();
  }

  private updateWords() {
    const card = this.deckService.currentCard;
    if (!card) return;
    this.words = this.isOnOriginalSide() ? card.wordsOriginal : card.wordsTranslate;
  }

}