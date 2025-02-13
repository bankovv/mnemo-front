import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatableTextComponent } from './components/translatable-text/translatable-text.component';
import { DeckComponent } from './components/deck/deck.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

@NgModule({
  declarations: [
    TranslatableTextComponent,
    DeckComponent,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TranslatableTextComponent,
    DeckComponent,
    LanguageSelectorComponent
  ]
})
export class SharedModule { }