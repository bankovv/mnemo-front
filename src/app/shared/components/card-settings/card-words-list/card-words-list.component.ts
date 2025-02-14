import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card-words-list',
  templateUrl: './card-words-list.component.html',
  styleUrl: './card-words-list.component.css'
})
export class CardWordsListComponent {

  @ViewChild('addWord')
  public addWordInput!: ElementRef;

  public words: string[] = [];

  ngOnInit() {

    this.words.push('word1');
    this.words.push('word2');
    this.words.push('word3');

  }

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

}