import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { OpenedDeckService } from '../../services/opened-deck.service';
import { CardModel } from '../../../../shared/models/decks/card.model';
import { CardVideosFacadeService } from '../../../api/services/facades/card-videos-facade.service';
import { extractYtVideoId } from '../../../../shared/utils';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-opened-deck',
  templateUrl: './opened-deck.component.html',
  styleUrl: './opened-deck.component.css'
})
export class OpenedDeckComponent {

  private deckService = inject(OpenedDeckService);
  private videoService = inject(CardVideosFacadeService);
  private cardChangeListener: (CardModel: CardModel) => void = this.onCardChange.bind(this);

  @ViewChild('card')
  public card!: CardComponent;

  @ViewChild('createCardDialog')
  public createCardDialog!: ElementRef;

  @ViewChild('videoDialog')
  public videoDialog!: ElementRef;
  @ViewChild('videoFrame')
  public videoFrame!: ElementRef;

  @ViewChild('dictationDialog')
  public dictationDialog!: ElementRef;

  public currentCardIndex = signal('');

  ngOnInit() {
    this.deckService.onCurrentCardChange(this.cardChangeListener);
  }

  ngOnDestroy() {
    this.deckService.offCurrentCardChange(this.cardChangeListener);
  }

  private updateCard() {
    if (this.card) {
      this.card.isOnOriginalSide.set(this.deckService.isOnOriginalSide);
      this.card.updateWords(this.deckService.currentCard);
    }
  }

  private onCardChange(card: CardModel) {
    if (!card) return;
    this.currentCardIndex.set(`${this.deckService.currentCardIndex + 1} / ${this.deckService.cards.length}`);
    this.updateCard();
  }

  public selectLanguageOriginal() {
    this.deckService.isOriginalSideDefault = true;
    this.updateCard();
  }

  public selectLanguageTranslate() {
    this.deckService.isOriginalSideDefault = false;
    this.updateCard();
  }

  public shuffleChanged(ev: any) {
    this.deckService.isRandomOrder = ev.target.checked;
  }

  public cardClicked() {
    this.deckService.turnCard();
    this.updateCard();
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

  public async videoButtonClicked() {
    this.videoFrame.nativeElement.removeAttribute('src');
    this.videoService.getVideos(this.deckService.currentCard.cardId).subscribe(resp => {
      if (resp && resp.length > 0) {
        const videoId = extractYtVideoId(resp[0]);
        const url = `https://www.youtube.com/embed/${videoId}`;
        this.videoFrame.nativeElement.src = url;
        this.videoDialog.nativeElement.showModal();
      }
    });
  }

  public dictationButtonClicked() {
    this.dictationDialog.nativeElement.showModal();
  }

  public isDeckEmpty(): boolean {
    return !this.deckService || !this.deckService.cards || this.deckService.cards.length === 0;
  }

  public get deckName() {
    if (!this.deckService.currentDeck) return '';
    return this.deckService.currentDeck.deckName;
  }

  public get languageOriginal() {
    if (!this.deckService || !this.deckService.currentDeck)
      return '';
    return this.deckService.currentDeck.languageOriginal;
  }

  public get languageTranslate() {
    if (!this.deckService || !this.deckService.currentDeck)
      return '';
    return this.deckService.currentDeck.languageTranslate;
  }

}