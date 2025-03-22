import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatableTextComponent } from './components/translatable-text/translatable-text.component';
import { DeckComponent } from './components/deck/deck.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { CardSettingsComponent } from './components/card-settings/card-settings.component';
import { CardWordsListComponent } from './components/card-settings/card-words-list/card-words-list.component';
import { CardVideosListComponent } from './components/card-settings/card-videos-list/card-videos-list.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    TranslatableTextComponent,
    DeckComponent,
    CardComponent,
    LanguageSelectorComponent,
    CardSettingsComponent,
    CardWordsListComponent,
    CardVideosListComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TranslatableTextComponent,
    DeckComponent,
    CardComponent,
    LanguageSelectorComponent,
    CardSettingsComponent
  ]
})
export class SharedModule { }