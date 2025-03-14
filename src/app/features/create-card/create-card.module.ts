import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CreateCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CreateCardComponent
  ]
})
export class CreateCardModule { }