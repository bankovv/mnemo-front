import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LocalizationApiService } from '../../features/api/services/backend/localization-api.service';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  private localStorageService = inject(LocalStorageService);
  private localeApiService = inject(LocalizationApiService);
  private localeList: Array<string> = [];

  private textTranslationsMap!: Map<string, string>;

  private onLocaleChangeList: Array<(locale: string) => void> = [];
  private afterInitList: Array<(locale: string) => void> = [];
  private inited = false;

  public initLocalization(): Promise<void> {

    if (this.inited) return Promise.resolve();

    return new Promise(res => {
      this.updateLocalesList()
        .then(() => this.initUserLocale())
        .then(() => this.updateTextTranslationsMap())
        .then(() => this.inited = true)
        .then(() => this.afterInit())
        .then(() => res());
    });

  }

  private afterInit() {
    this.afterInitList.forEach(afterInit => afterInit(this.localStorageService.getUserLocale()!));
  }

  private updateLocalesList(): Promise<Array<string>> {
    return lastValueFrom(this.localeApiService.getLocales()).then(locales => this.localeList = locales);
  }

  private initUserLocale() {

    if (!this.localStorageService.getUserLocale()) {
      const userLocale = navigator.language;
      const locale = this.localeList.includes(userLocale) ? userLocale : 'en_US';
      this.localStorageService.setUserLocale(locale);
    }

  }

  private updateTextTranslationsMap() {
    return lastValueFrom(this.localeApiService.getTextTranslations(this.localStorageService.getUserLocale()!))
      .then(translations => this.textTranslationsMap = translations);
  }

  public setLocale(locale: string) {
    if (this.localeList.includes(locale)) {
      this.localStorageService.setUserLocale(locale);
      this.onLocaleUpdate();
    }
  }

  private onLocaleUpdate() {
    this.updateTextTranslationsMap().then(() => 
      this.onLocaleChangeList.forEach(onChange => onChange(this.localStorageService.getUserLocale()!))
    );
  }

  public addOnLocaleChange(onChange: (locale: string) => void) {
    this.onLocaleChangeList.push(onChange);
  }

  public getTranslate(translateKey: string) {
    return this.textTranslationsMap.get(translateKey);
  }

  public addAfterInit(afterInit: (locale: string) => void) {
    if (this.inited) afterInit(this.localStorageService.getUserLocale()!);
    this.afterInitList.push(afterInit);
  }

  public getAvailableLocales() {
    return this.localeList;
  }

  public getLanguageTranslate(locale: string) {
    const onlyLang = locale.substring(0, 2);
    const loc = new Intl.DisplayNames([this.localStorageService.getUserLocale()!], {type: 'language'});
    return loc.of(onlyLang);
  }

  public getCurrentLocale() {
    return this.localStorageService.getUserLocale();
  }

}