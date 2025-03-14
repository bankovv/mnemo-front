import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { OpenedDeckService } from '../../../services/opened-deck.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  private deckService = inject(OpenedDeckService);
  private deckChangeListener = this.updateWords.bind(this);
  private cardChangeListener = this.updateWords.bind(this);

  public words: string[] = [];
  public isOnOriginalSide = this.deckService.isOnOriginalSideSignal;

  ngOnInit() {
    this.deckService.onDeckChange(this.deckChangeListener);
    this.deckService.onCurrentCardChange(this.cardChangeListener);
    this.updateWords();
  }

  ngAfterViewInit() {
    this.updateWords();
  }

  ngOnDestroy() {
    this.deckService.offDeckChange(this.deckChangeListener);
    this.deckService.offCurrentCardChange(this.cardChangeListener);
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