import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardRandomizerService {

  private _cardsLength!: number;
  private shuffledIndexes!: number[];
  private currentIndexOfShuffledIndex!: number;

  public nextIndex(): number {
    if (this.currentIndexOfShuffledIndex >= this.shuffledIndexes.length - 1) {
      this.shuffleIndexes();
      this.currentIndexOfShuffledIndex = -1;
    }
    return this.shuffledIndexes[++this.currentIndexOfShuffledIndex];
  }

  public prevIndex(): number {
    if (this.currentIndexOfShuffledIndex <= 0) {
      this.shuffleIndexes();
      this.currentIndexOfShuffledIndex = this.shuffledIndexes.length;
    }
    return this.shuffledIndexes[--this.currentIndexOfShuffledIndex];
  }

  private shuffleIndexes() {
    for (let i = this.shuffledIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledIndexes[i], this.shuffledIndexes[j]] = [this.shuffledIndexes[j], this.shuffledIndexes[i]];
    }
  }

  public set cardsLength(cardsLength: number) {
    this._cardsLength = cardsLength;
    this.currentIndexOfShuffledIndex = -1;
    this.shuffledIndexes = [];
    for (let i = 0; i < this._cardsLength; i++)
      this.shuffledIndexes.push(i);
    this.shuffleIndexes();
  }

}