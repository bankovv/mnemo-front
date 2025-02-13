import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { Theme } from './core/enums/theme.enum';
import { LocalizationService } from './core/services/localization.service';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private sessionService = inject(SessionService);
  private localizationService = inject(LocalizationService);
  private themeService = inject(ThemeService);

  @ViewChild('mainWrapper') mainWrapper!: ElementRef;

  ngOnInit() {
    this.sessionService.checkSession().subscribe();
  }

  ngAfterViewInit() {
    this.localizationService.initLocalization()
    .then(() => this.initThemeService());
  }

  private initThemeService() {
    this.themeService.addOnThemeChange(theme => {
      this.mainWrapper.nativeElement.classList.remove(...Object.values(Theme));
      this.mainWrapper.nativeElement.classList.add(theme);
    });
    this.themeService.initUserTheme();
  }

}