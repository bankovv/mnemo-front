import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenedDeckComponent } from './components/opened-deck/opened-deck.component';
import { CardComponent } from './components/opened-deck/card/card.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    OpenedDeckComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OpenedDeckModule { }