import { Component, inject, ViewChild } from '@angular/core';
import { OpenedDeckService } from '../../../opened-deck/services/opened-deck.service';
import { DeckModel } from '../../../../shared/models/decks/deck.model';
import { CardModel } from '../../../../shared/models/decks/card.model';
import { CardSettingsComponent } from '../../../../shared/components/card-settings/card-settings.component';
import { DeckFacadeService } from '../../../api/services/facades/deck-facade.service';
import { CardCreateResponse } from '../../../api/dtos/cards/create/card-create-response.dto';
import { RoutingService } from '../../../../core/services/routing.service';
import { CardVideosFacadeService } from '../../../api/services/facades/card-videos-facade.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.css'
})
export class CreateCardComponent {

  private deckService = inject(OpenedDeckService);
  private routingService = inject(RoutingService);
  private deckFacadeService = inject(DeckFacadeService);
  private cardVideosFacadeService = inject(CardVideosFacadeService);

  @ViewChild('cardSettings')
  public cardSettings!: CardSettingsComponent;

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

  public createCardButtonClicked() {

    var valid = true;
    if (this.card.wordsOriginal.length === 0) {
      this.cardSettings.blinkOriginalWordsList();
      valid = false;
    }

    if (this.card.wordsTranslate.length === 0) {
      this.cardSettings.blinkTranslateWordsList();
      valid = false;
    }

    if (!valid) return;
    this.deckFacadeService.createCard(
      this.deck.deckPublicId, this.card.wordsOriginal, this.card.wordsTranslate
    ).subscribe((resp: CardCreateResponse) => {

      this.routingService.navigate(['deck', this.deck.deckPublicId]);

      if (this.cardSettings.cardVideos && this.cardSettings.cardVideos.length !== 0 && resp.cardId !== -1) {
        this.cardSettings.cardVideos.forEach(video =>
          this.cardVideosFacadeService.addVideo(resp.cardId, this.deck.deckPublicId, video).subscribe());
      }

    });

  }

}