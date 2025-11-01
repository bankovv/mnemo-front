import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private static readonly STORAGE_LOCALE_KEY = "mnemo-locale";
  private static readonly STORAGE_THEME_KEY = "mnemo-theme";

  public getUserLocale() {
    return localStorage.getItem(LocalStorageService.STORAGE_LOCALE_KEY);
  }

  public setUserLocale(locale: string) {
    localStorage.setItem(LocalStorageService.STORAGE_LOCALE_KEY, locale);
  }

  public getUserTheme() {
    return localStorage.getItem(LocalStorageService.STORAGE_THEME_KEY);
  }

  public setUserTheme(theme: string) {
    localStorage.setItem(LocalStorageService.STORAGE_THEME_KEY, theme);
  }

}