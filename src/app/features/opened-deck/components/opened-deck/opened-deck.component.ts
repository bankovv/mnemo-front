import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { OpenedDeckService } from '../../services/opened-deck.service';
import { CardModel } from '../../../../shared/models/decks/card.model';
import { CardComponent } from './card/card.component';
import { CardVideosFacadeService } from '../../../api/services/facades/card-videos-facade.service';
import { firstValueFrom } from 'rxjs';
import { extractYtVideoId } from '../../../../shared/utils';

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
    return this.deckService.currentDeck.languageOriginal;
  }

  public get languageTranslate() {
    return this.deckService.currentDeck.languageTranslate;
  }

}