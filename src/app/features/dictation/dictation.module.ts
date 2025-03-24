import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictationComponent } from './components/dictation/dictation.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    DictationComponent
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
