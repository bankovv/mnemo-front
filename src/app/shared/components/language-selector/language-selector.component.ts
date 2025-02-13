import { Component, inject, Input } from '@angular/core';
import { LanguageApiService } from '../../../features/api/services/backend/language-api.service';
import { LocalizationService } from '../../../core/services/localization.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {

  private languagesApi = inject(LanguageApiService);
  private localizationService = inject(LocalizationService);

  public languages!: string[];
  @Input('selected')
  public selectedLanguage!: string;

  ngOnInit() {
    this.languagesApi.getAllLanguages().subscribe((resp: any) => {
      this.languages = resp.languages;
    });
  }

  public localeLanguageText(locale: string) {
    return this.localizationService.getLanguageTranslate(locale);
  }

  public selectLanguage(langKey: string) {
    this.selectedLanguage = langKey;
  }

}