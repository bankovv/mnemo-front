import { ChangeDetectorRef, Component, inject, Input, ViewChild } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { OpenedDeckService } from '../../../opened-deck/services/opened-deck.service';

@Component({
  selector: 'app-dictation',
  templateUrl: './dictation.component.html',
  styleUrl: './dictation.component.css'
})
export class DictationComponent {

  private deckService = inject(OpenedDeckService);
  private changeDetector = inject(ChangeDetectorRef);
  private isQuestionOriginal!: boolean;

  @ViewChild('question')
  public questionCard!: CardComponent;
  @ViewChild('answer')
  public answerCard!: CardComponent;

  ngAfterViewChecked() {
    this.isQuestionOriginal = this.deckService.isOriginalSideDefault;
    this.questionCard.isOnOriginalSide.set(this.isQuestionOriginal);
    this.answerCard.isOnOriginalSide.set(!this.isQuestionOriginal);
    this.questionCard.updateWords(this.deckService.currentCard);
    this.changeDetector.detectChanges();
  }

}