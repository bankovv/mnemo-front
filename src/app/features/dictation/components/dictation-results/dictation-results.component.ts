import { Component, inject } from '@angular/core';
import { DictationService } from '../../services/dictation.service';
import { DictationCard } from '../../models/dictation-card.model';

@Component({
  selector: 'app-dictation-results',
  templateUrl: './dictation-results.component.html',
  styleUrl: './dictation-results.component.css'
})
export class DictationResultsComponent {

  private dictationService = inject(DictationService);

  public restartDictation() {
    this.dictationService.restartDictation();
  }

  public get results() {
    return this.dictationService.dictationResults;
  }

  public isRightAnswerMatched(card: DictationCard, word: string): boolean {    
    return card.enteredAnswerWords.includes(word.trim());
  }

  public isEnteredAnswerMatched(card: DictationCard, word: string) {
    return card.rightAnswerWords.includes(word.trim());
  }

}