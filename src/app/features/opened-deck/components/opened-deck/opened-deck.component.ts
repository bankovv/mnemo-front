import { Component, inject, signal } from '@angular/core';
import { OpenedDeckService } from '../../services/opened-deck.service';
import { CardVideosFacadeService } from '../../../api/services/facades/card-videos-facade.service';
import { CardModel } from '../../../../shared/models/decks/card.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-opened-deck',
  templateUrl: './opened-deck.component.html',
  styleUrl: './opened-deck.component.css'
})
export class OpenedDeckComponent {

  private deckService = inject(OpenedDeckService);
  private videosService = inject(CardVideosFacadeService);
  private domSanitizer = inject(DomSanitizer);

  public currentVideo: SafeResourceUrl | undefined = undefined;
  public currentCardIndex = signal('');

  ngOnInit() {

    this.deckService.onCurrentCardChange((card: CardModel) => {

      if (!card) return;
      this.currentCardIndex.set(`${this.deckService.currentCardIndex + 1} / ${this.deckService.cards.length}`);

      this.videosService.getVideos(card.cardId).subscribe(videos => {
        if (videos.length > 0) {
          this.currentVideo = this.domSanitizer.bypassSecurityTrustResourceUrl(videos[0]);
        } else {
          this.currentVideo = undefined;
        }
      });

    });

  }

  public prevCard() {
    this.deckService.prevCard();
  }

  public nextCard() {
    this.deckService.nextCard();
  }

  public isDeckEmpty(): boolean {
    return !this.deckService || !this.deckService.cards || this.deckService.cards.length === 0;
  }

}