import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDecksComponent } from './components/my-decks/my-decks.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    MyDecksComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MyDecksModule { }
