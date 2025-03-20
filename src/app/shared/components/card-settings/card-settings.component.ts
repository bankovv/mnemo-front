import { Component, Input, signal, ViewChild } from '@angular/core';
import { DeckModel } from '../../models/decks/deck.model';
import { CardModel } from '../../models/decks/card.model';
import { CardWordsListComponent } from './card-words-list/card-words-list.component';
import { CardVideosListComponent } from './card-videos-list/card-videos-list.component';

@Component({
  selector: 'app-card-settings',
  templateUrl: './card-settings.component.html',
  styleUrl: './card-settings.component.css'
})
export class CardSettingsComponent {

  @Input('deck')
  public deck!: DeckModel;
  @Input('card')
  public card!: CardModel;

  @ViewChild('original')
  public orginalList!: CardWordsListComponent;
  @ViewChild('translate')
  public translateList!: CardWordsListComponent;
  @ViewChild('videos')
  public videosList!: CardVideosListComponent;

  constructor() {

    this.deck = {
      deckPublicId: 'lala',
      deckName: 'lala',
      languageOriginal: 'english',
      languageTranslate: 'russian',
      createdAt: undefined!,
      cardsCount: 2
    }

    this.card = {
      cardId: 111,
      wordsOriginal: ['Elaborate'],
      wordsTranslate: ['Разрабатывать', 'Продуманный'],
      videoUrls: [],
      audioUrls: [],
      createdAt: undefined!
    }

  }

  public blinkOriginalWordsList() {
    this.orginalList.blinkWarning();
  }

  public blinkTranslateWordsList() {
    this.translateList.blinkWarning();
  }

  public get cardVideos() {
    return this.videosList.videos;
  }

}