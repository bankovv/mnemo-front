import { Injectable } from '@angular/core';
import { CardModel } from '../../../shared/models/decks/card.model';
import { DictationCard } from '../models/dictation-card.model';

@Injectable({
  providedIn: 'root'
})
export class DictationService {

  private _cards!: CardModel[];
  private _isOnOriginalSide!: boolean;
  private _isDictationCompleted!: boolean;

  private currentQuestionIndex: number = 0;
  private _dictationResults: DictationCard[] = [];

  private onDictationRestartListeners: (() => void)[] = [];

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

  public restartDictation() {
    this.currentQuestionIndex = 0;
    this.clearDictationResults();
    this.isDictationCompleted = false;
    this.onDictationRestartListeners.forEach(onRestart => onRestart());
  }

  public onDictationRestart(onRestart: () => void) {
    this.onDictationRestartListeners.push(onRestart);
  }

  public offDictationRestart(onRestart: () => void) {
    const index = this.onDictationRestartListeners.indexOf(onRestart);
    this.onDictationRestartListeners.splice(index, 1);
  }

  private clearDictationResults() {

    if (!this._cards) return;

    this._dictationResults = [];
    this._cards.forEach(card => {
      const dictCard: DictationCard = {
        questionWords: this._isOnOriginalSide ? card.wordsOriginal : card.wordsTranslate,
        rightAnswerWords: this._isOnOriginalSide ? card.wordsTranslate : card.wordsOriginal,
        enteredAnswerWords: []
      }
      this._dictationResults.push(dictCard);
    });

  }

  // Getters

  public get currentDictationCard(): DictationCard {
    if (this._dictationResults.length === 0) return {questionWords: [], rightAnswerWords: [], enteredAnswerWords: []};
    return this._dictationResults[this.currentQuestionIndex];
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

  public get dictationResults() {
    return this._dictationResults;
  }

  public get isDictationCompleted() {
    return this._isDictationCompleted;
  }

  // Setters

  public set cards(cards: CardModel[]) {
    this._cards = cards;
    this.restartDictation();
  }

  public set isOnOriginalSide(isOnOriginalSide: boolean) {
    this._isOnOriginalSide = isOnOriginalSide;
    this.clearDictationResults();
  }

  public set isDictationCompleted(isDictationCompleted: boolean) {
    this._isDictationCompleted = isDictationCompleted;
  }

}