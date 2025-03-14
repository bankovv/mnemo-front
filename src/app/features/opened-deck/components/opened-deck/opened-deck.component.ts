import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { OpenedDeckService } from '../../services/opened-deck.service';
import { CardVideosFacadeService } from '../../../api/services/facades/card-videos-facade.service';
import { CardModel } from '../../../../shared/models/decks/card.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-opened-deck',
  templateUrl: './opened-deck.component.html',
  styleUrl: './opened-deck.component.css'
})
export class OpenedDeckComponent {

  private deckService = inject(OpenedDeckService);
  private videosService = inject(CardVideosFacadeService);
  private domSanitizer = inject(DomSanitizer);

  private cardChangeListener: (CardModel: CardModel) => void = this.onCardChange.bind(this);

  @ViewChild('card')
  public card!: CardComponent;
  @ViewChild('createCardDialog')
  public createCardDialog!: ElementRef;

  public currentVideo: SafeResourceUrl | undefined = undefined;
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

    this.videosService.getVideos(card.cardId).subscribe(videos => {
      if (videos.length > 0) {
        this.currentVideo = this.domSanitizer.bypassSecurityTrustResourceUrl(videos[0]);
      } else {
        this.currentVideo = undefined;
      }
    });

  }

  public selectLanguageOriginal() {
    this.deckService.isOriginalSideDefault = true;
    this.card.updateWords();
  }

  public selectLanguageTranslate() {
    this.deckService.isOriginalSideDefault = false;
    this.card.updateWords();
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