import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { LocalizationService } from './services/localization.service';
import { RoutingService } from './services/routing.service';
import { ThemeService } from './services/theme.service';
import { ApiModule } from '../features/api/api.module';
import { SessionService } from './services/session.service';

@NgModule({
  declarations: [],
  providers: [
    LocalStorageService,
    RoutingService,
    LocalizationService,
    ThemeService,
    SessionService
  ],
  imports: [
    CommonModule,
    ApiModule
  ]
})
export class CoreModule { }