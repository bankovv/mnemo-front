import { Component, ElementRef, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrl: './my-decks.component.css'
})
export class MyDecksComponent {

  public isOnAddedList = signal(true);

  public addedRadioChanged() {
    this.isOnAddedList.set(true);
  }

  public createdRadioChanged() {
    this.isOnAddedList.set(false);
  }

}