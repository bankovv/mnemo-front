import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { LocalizationService } from '../../../../core/services/localization.service';
import { LanguageSelectorComponent } from '../../../../shared/components/language-selector/language-selector.component';
import { DeckFacadeService } from '../../../api/services/facades/deck-facade.service';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrl: './create-deck.component.css'
})
export class CreateDeckComponent {

  @ViewChild('deckName')
  public deckNameInput!: ElementRef;

  @ViewChild('deckId')
  public deckPublicIdInput!: ElementRef;

  @ViewChild('langOrig')
  public langOrigSelector!: LanguageSelectorComponent;

  @ViewChild('langTrans')
  public langTransSelector!: LanguageSelectorComponent;

  public localizationService = inject(LocalizationService);
  private deckService= inject(DeckFacadeService);

  public createDeck() {

    this.deckService.createDeck(
      this.deckNameInput.nativeElement.value,
      this.deckPublicIdInput.nativeElement.value,
      this.langOrigSelector.selectedLanguage,
      this.langTransSelector.selectedLanguage
    ).subscribe(resp => console.log(resp));

  }

}