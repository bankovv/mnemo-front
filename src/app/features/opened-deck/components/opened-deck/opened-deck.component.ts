import { Component, inject, signal } from '@angular/core';
import { OpenedDeckService } from '../../services/opened-deck.service';
import { CardVideosFacadeService } from '../../../api/services/facades/card-videos-facade.service';
import { CardModel } from '../../../../shared/models/decks/card.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RoutingService } from '../../../../core/services/routing.service';

@Component({
  selector: 'app-opened-deck',
  templateUrl: './opened-deck.component.html',
  styleUrl: './opened-deck.component.css'
})
export class OpenedDeckComponent {

  private deckService = inject(OpenedDeckService);
  private videosService = inject(CardVideosFacadeService);
  private routingService = inject(RoutingService);
  private domSanitizer = inject(DomSanitizer);

  private cardChangeListener: (CardModel: CardModel) => void = this.onCardChange.bind(this);

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

  public prevCard() {
    this.deckService.prevCard();
  }

  public nextCard() {
    this.deckService.nextCard();
  }

  public createCardButtonPressed() {
    this.routingService.navigate(['deck', this.deckService.currentDeck.deckPublicId, 'create-card']);
  }

  public isDeckEmpty(): boolean {
    return !this.deckService || !this.deckService.cards || this.deckService.cards.length === 0;
  }

}