import { Component, Input, Signal, inject, signal } from '@angular/core';
import { LocalizationService } from '../../../core/services/localization.service';

@Component({
  selector: 'app-translatable-text',
  templateUrl: './translatable-text.component.html',
  styleUrl: './translatable-text.component.css'
})
export class TranslatableTextComponent {

  private localizationService = inject(LocalizationService);

  @Input() translateKey!: string;
  translateText = signal('');

  ngAfterViewInit() {
    this.localizationService.addAfterInit(locale => this.updateTranslateText());
    this.localizationService.addOnLocaleChange(locale => this.updateTranslateText());
  }

  private updateTranslateText() {
    this.translateText.set(this.localizationService.getTranslate(this.translateKey)!);
  }

}