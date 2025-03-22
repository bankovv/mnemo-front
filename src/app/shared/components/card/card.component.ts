import { Component, Input, signal } from '@angular/core';
import { CardModel } from '../../models/decks/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  public words: string[] = [];
  public isOnOriginalSide = signal(true);

  public updateWords(card: CardModel) {
    if (!card) return;
    this.words = this.isOnOriginalSide() ? card.wordsOriginal : card.wordsTranslate;
  }

}