import { Component, ElementRef, inject, Input, signal, ViewChild } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { OpenedDeckService } from '../../../opened-deck/services/opened-deck.service';
import { DictationService } from '../../services/dictation.service';
import { DeckModel } from '../../../../shared/models/decks/deck.model';

@Component({
  selector: 'app-dictation',
  templateUrl: './dictation.component.html',
  styleUrl: './dictation.component.css'
})
export class DictationComponent {

  private deckService = inject(OpenedDeckService);
  private dictationService = inject(DictationService);
  private isQuestionOriginal!: boolean;

  private deckChangeListener: (deck: DeckModel) => void = this.deckChanged.bind(this);
  private isOriginalSideDefaultListener: (isOrig: boolean) => void = this.isOriginalSideDefaultChanged.bind(this);

  @ViewChild('question')
  public questionCard!: CardComponent;
  @ViewChild('answer')
  public answerCard!: CardComponent;
  @ViewChild('answerInput')
  public answerInput!: ElementRef;

  public counter = signal('');

  ngOnInit() {
    this.deckService.onDeckChange(this.deckChangeListener);
    this.deckService.onIsOriginalSideDefaultChange(this.isOriginalSideDefaultListener);
  }

  ngOnDestroy() {
    this.deckService.offDeckChange(this.deckChangeListener);
    this.deckService.offIsOriginalSideDefaultChange(this.isOriginalSideDefaultListener);
  }

  private deckChanged() {

    this.isQuestionOriginal = this.deckService.isOriginalSideDefault;
    this.questionCard.isOnOriginalSide.set(this.isQuestionOriginal);
    this.answerCard.isOnOriginalSide.set(!this.isQuestionOriginal);

    this.dictationService.isOnOriginalSide = this.deckService.isOriginalSideDefault;
    this.dictationService.cards = this.deckService.cards;
    this.updateWords();
    this.updateCounter();

  }

  private isOriginalSideDefaultChanged(isOriginalSideDefault: boolean) {
    this.dictationService.isOnOriginalSide = isOriginalSideDefault;
    this.updateWords();
  }

  public prevQuestion() {
    this.dictationService.prevQuestion();
    this.updateWords();
    this.updateCounter();
  }

  public nextQuestion() {
    this.dictationService.nextQuestion();
    this.updateWords();
    this.updateCounter();
  }

  public addAnswer() {
    const answer = this.answerInput.nativeElement.value.trim();
    if (!answer || answer.length === 0) return;
    this.dictationService.addAnswer(answer);
    this.updateWords();
    this.answerInput.nativeElement.value = '';
  }

  private updateCounter() {
    this.counter.set(this.dictationService.counter);
  }

  private updateWords() {
    this.questionCard.words = this.dictationService.currentQuestionWords;
    this.answerCard.words = this.dictationService.currentAnswerWords;
  }

}