import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { ApiModule } from './features/api/api.module';
import { AuthModule } from './features/auth/auth.module';
import { SearchModule } from './features/search/search.module';
import { OpenedDeckModule } from './features/opened-deck/opened-deck.module';
import { CreateDeckModule } from './features/create-deck/create-deck.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,

    CoreModule,
    SharedModule,
    LayoutModule,

    ApiModule,
    AuthModule,
    SearchModule,
    OpenedDeckModule,
    CreateDeckModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }