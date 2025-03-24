import { Injectable } from '@angular/core';
import { CardModel } from '../../../shared/models/decks/card.model';
import { DictationCard } from '../models/dictation-card.model';

@Injectable({
  providedIn: 'root'
})
export class DictationService {

  private _cards!: CardModel[];
  private _isOnOriginalSide!: boolean;

  private currentQuestionIndex: number = 0;
  private dictationResults: DictationCard[] = [];

  public nextQuestion() {
    this.currentQuestionIndex = this.currentQuestionIndex >= this._cards.length - 1 ? 0 : this.currentQuestionIndex + 1;
  }

  public prevQuestion() {
    this.currentQuestionIndex = this.currentQuestionIndex <= 0 ? this._cards.length - 1 : this.currentQuestionIndex - 1;
  }

  public addAnswer(answer: string) {
    if (!answer || answer.length === 0 || this.currentDictationCard.enteredAnswerWords.includes(answer)) return;
    this.currentDictationCard.enteredAnswerWords.push(answer);
  }

  private clearDictationResults() {

    if (!this._cards) return;

    this.dictationResults = [];
    this._cards.forEach(card => {
      const dictCard: DictationCard = {
        questionWords: this._isOnOriginalSide ? card.wordsOriginal : card.wordsTranslate,
        rightAnswerWords: this._isOnOriginalSide ? card.wordsTranslate : card.wordsOriginal,
        enteredAnswerWords: []
      }
      this.dictationResults.push(dictCard);
    });

  }

  // Getters

  public get currentDictationCard(): DictationCard {
    if (this.dictationResults.length === 0) return {questionWords: [], rightAnswerWords: [], enteredAnswerWords: []};
    return this.dictationResults[this.currentQuestionIndex];
  }

  public get currentQuestionWords(): string[] {
    return this.currentDictationCard.questionWords;
  }

  public get currentAnswerWords(): string[] {
    return this.currentDictationCard.enteredAnswerWords;
  }

  public get counter() {
    return this.currentQuestionIndex+1 + ' / ' + this._cards.length;
  }

  // Setters

  public set cards(cards: CardModel[]) {
    this._cards = cards;
    this.currentQuestionIndex = 0;
    this.clearDictationResults();
  }

  public set isOnOriginalSide(isOnOriginalSide: boolean) {
    this._isOnOriginalSide = isOnOriginalSide;
    this.clearDictationResults();
  }

}