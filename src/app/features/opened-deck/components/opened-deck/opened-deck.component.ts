import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { OpenedDeckService } from '../../services/opened-deck.service';
import { CardModel } from '../../../../shared/models/decks/card.model';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-opened-deck',
  templateUrl: './opened-deck.component.html',
  styleUrl: './opened-deck.component.css'
})
export class OpenedDeckComponent {

  private deckService = inject(OpenedDeckService);
  private cardChangeListener: (CardModel: CardModel) => void = this.onCardChange.bind(this);

  @ViewChild('card')
  public card!: CardComponent;
  @ViewChild('createCardDialog')
  public createCardDialog!: ElementRef;

  public currentCardIndex = signal('');

  ngOnInit() {
    this.deckService.onCurrentCardChange(this.cardChangeListener);
  }

  ngOnDestroy() {
    this.deckService.offCurrentCardChange(this.cardChangeListener);
  }

  private onCardChange(card: CardModel) {
    if (!card) return;
    this.currentCardIndex.set(`${this.deckService.currentCardIndex + 1} / ${this.deckService.cards.length}`);
  }

  public selectLanguageOriginal() {
    this.deckService.isOriginalSideDefault = true;
    this.card.updateWords();
  }

  public selectLanguageTranslate() {
    this.deckService.isOriginalSideDefault = false;
    this.card.updateWords();
  }

  public shuffleChanged(ev: any) {
    this.deckService.isRandomOrder = ev.target.checked;
  }

  public prevCard() {
    this.deckService.prevCard();
  }

  public nextCard() {
    this.deckService.nextCard();
  }

  public createCardButtonClicked() {
    this.createCardDialog.nativeElement.showModal();
  }

  public isDeckEmpty(): boolean {
    return !this.deckService || !this.deckService.cards || this.deckService.cards.length === 0;
  }

  public get deckName() {
    if (!this.deckService.currentDeck) return '';
    return this.deckService.currentDeck.deckName;
  }

  public get languageOriginal() {
    return this.deckService.currentDeck.languageOriginal;
  }

  public get languageTranslate() {
    return this.deckService.currentDeck.languageTranslate;
  }

}