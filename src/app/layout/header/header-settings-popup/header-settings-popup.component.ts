import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { Theme } from '../../../core/enums/theme.enum';
import { LocalizationService } from '../../../core/services/localization.service';
import { lastValueFrom } from 'rxjs';
import { SessionService } from '../../../core/services/session.service';
import { RoutingService } from '../../../core/services/routing.service';

@Component({
  selector: 'app-header-settings-popup',
  templateUrl: './header-settings-popup.component.html',
  styleUrl: './header-settings-popup.component.css'
})
export class HeaderSettingsPopupComponent {

  @ViewChild('themeDetails') themeDetails!: ElementRef;
  @ViewChild('langDetails') langDetails!: ElementRef;

  private themeService = inject(ThemeService);
  private localizationService = inject(LocalizationService);
  private sessionService = inject(SessionService);
  private routingService = inject(RoutingService);

  public themes: Array<string> = [];
  public locales: Array<string> = [];

  public currentTheme = signal('');
  public currentLanguage = signal('');

  ngOnInit() {
    this.initLanguages().then(() => this.initThemes());
  }

  private initLanguages(): Promise<void> {

    return new Promise(res => {

      this.localizationService.addAfterInit((locale) => {
        this.locales = this.localizationService.getAvailableLocales();
        this.currentLanguage.set(this.localeLanguageText(locale)!);
      });
      this.localizationService.addOnLocaleChange(locale => {
        this.currentLanguage.set(this.localeLanguageText(locale)!);
        this.currentTheme.set(this.themeTranslate(this.themeService.getCurrentTheme())!);
      });
      res();

    });

  }

  private initThemes() {

    this.themeService.addAfterInit(theme => {
      const key = 'themes.' + theme;
      this.currentTheme.set(this.localizationService.getTranslate(key)!);
      this.themes = this.themeService.getAvailableThemes();
    });

    this.themeService.addOnThemeChange(theme => {
      this.currentTheme.set(this.localizationService.getTranslate('themes.' + theme)!);
    });

  }

  public themeTranslate(themeName: string) {
    return this.localizationService.getTranslate('themes.' + themeName);
  }

  public themeSelected(themeName: string) {
    this.themeService.setThemeByName(themeName.toLowerCase());
    this.themeDetails.nativeElement.open = false;
  }

  public localeLanguageText(locale: string) {
    return this.localizationService.getLanguageTranslate(locale);
  }

  public localeSelected(locale: string) {
    this.localizationService.setLocale(locale);
    this.langDetails.nativeElement.open = false;
  }

  public myDecksClicked() {

  }

  public createDeckClicked() {
    this.routingService.navigate(['create-deck']);
  }

  public isLoggedIn() {
    return this.sessionService.isLoggedIn();
  }

  public logout() {
    this.sessionService.logout().subscribe();
  }

}