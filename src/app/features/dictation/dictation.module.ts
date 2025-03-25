import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictationComponent } from './components/dictation/dictation.component';
import { SharedModule } from '../../shared/shared.module';
import { DictationResultsComponent } from './components/dictation-results/dictation-results.component';



@NgModule({
  declarations: [
    DictationComponent,
    DictationResultsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DictationComponent
  ]
})
export class DictationModule { }
