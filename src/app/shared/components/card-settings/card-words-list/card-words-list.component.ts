import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DeckModel } from '../../../models/decks/deck.model';
import { CardModel } from '../../../models/decks/card.model';

@Component({
  selector: 'app-card-words-list',
  templateUrl: './card-words-list.component.html',
  styleUrl: './card-words-list.component.css'
})
export class CardWordsListComponent {

  @Input('deck')
  public deck!: DeckModel;
  @Input('card')
  public card!: CardModel;
  @Input('isOriginalLanguage')
  public isOriginalLanguage!: boolean;

  @ViewChild('addWord')
  public addWordInput!: ElementRef;

  public addWordButtonClicked() {
    this.addWord(this.addWordInput.nativeElement.value);
  }

  public removeWordButtonClicked(word: string) {
    this.words.splice(this.words.indexOf(word), 1);
  }

  public addWord(word: string) {
    word = word.trim();
    if (!word || word.length === 0 || this.words.includes(word))
      return;
    this.words.push(word);
    this.addWordInput.nativeElement.value = '';
  }

  public get words() {
    return this.isOriginalLanguage ? this.card.wordsOriginal : this.card.wordsTranslate;
  }

  public get language() {
    return this.isOriginalLanguage ? this.deck.languageOriginal : this.deck.languageTranslate;
  }

}