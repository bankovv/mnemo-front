import { Component, inject } from '@angular/core';
import { DeckFacadeService } from '../../../api/services/facades/deck-facade.service';
import { DeckModel } from '../../../../shared/models/decks/deck.model';
import { DecksPageModel } from '../../../../shared/models/decks/decks-page.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  private decksFacade = inject(DeckFacadeService);

  public results!: Array<DeckModel>;

  ngOnInit() {

    this.decksFacade.getDecksPage(0, 12).subscribe((page: DecksPageModel) => {
      this.results = page.decks;
    });

  }

}