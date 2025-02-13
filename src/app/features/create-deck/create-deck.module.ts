import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDeckComponent } from './components/create-deck/create-deck.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CreateDeckComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CreateDeckModule { }