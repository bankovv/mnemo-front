import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Theme } from '../enums/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private onThemeChangeList: Array<(theme: Theme) => void> = [];
  private afterInitList: Array<(theme: Theme) => void> = [];
  private inited = false;

  private localStorageService = inject(LocalStorageService);
  private currentTheme!: Theme;

  public setThemeByName(themeName: string) {
    Object.values(Theme).forEach(theme => {
      if (theme === themeName) this.setTheme(theme);
    });
  }

  public setTheme(theme: Theme) {
    if (this.currentTheme === theme) return;
    this.onThemeChangeList.forEach(onChange => onChange(theme));
    this.localStorageService.setUserTheme(theme);
    this.currentTheme = theme;
  }

  public addOnThemeChange(onChange: (theme: Theme) => void) {
    this.onThemeChangeList.push(onChange);
  }

  public addAfterInit(afterInit: (theme: Theme) => void) {
    if (this.inited) afterInit(this.currentTheme);
    this.afterInitList.push(afterInit);
  }

  public initUserTheme() {

    const userTheme = this.localStorageService.getUserTheme();
    if (userTheme) {
      Object.values(Theme).forEach(theme => {
        if (theme === userTheme)
          this.setTheme(theme);
      })
    } else {
      this.setTheme(Theme.LightTheme);
    }

    this.inited = true;
    this.afterInit();

  }

  private afterInit() {
    this.afterInitList.forEach(afterInit => afterInit(this.currentTheme));
  }

  public getCurrentTheme():Theme {
    return this.currentTheme;
  }

  public getAvailableThemes() {
    return Object.values(Theme);
  }

}