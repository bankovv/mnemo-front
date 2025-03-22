import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictationComponent } from './components/dictation/dictation.component';



@NgModule({
  declarations: [
    DictationComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DictationComponent
  ]
})
export class DictationModule { }
