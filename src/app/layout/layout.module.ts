import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderMenuItemComponent } from './header/header-menu-item/header-menu-item.component';
import { HeaderAccountComponent } from './header/header-account/header-account.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { HeaderSettingsPopupComponent } from './header/header-settings-popup/header-settings-popup.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderMenuItemComponent,
    HeaderAccountComponent,
    HeaderSettingsPopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    SharedModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule { }