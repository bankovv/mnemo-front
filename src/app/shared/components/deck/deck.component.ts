import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { DeckModel } from '../../models/decks/deck.model';
import { RoutingService } from '../../../core/services/routing.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent {

  private routingService = inject(RoutingService);

  @Input('deck')
  public deck!: DeckModel;

  @ViewChild('langOriginal')
  public langOriginalElement!: ElementRef;
  @ViewChild('langTranslate')
  public langTranslateElement!: ElementRef;

  @ViewChild('optionsMenu')
  public optionsMenu!: ElementRef;
  @ViewChild('optionsButton')
  public optionsButton!: ElementRef;

  ngAfterViewInit() {

    this.langOriginalElement.nativeElement.src = `./flags/${this.deck.languageOriginal}.svg`;
    this.langTranslateElement.nativeElement.src = `./flags/${this.deck.languageTranslate}.svg`;
    this.optionsMenu.nativeElement.style.display = 'none';

  }

  public deckLeftClicked(): void {
    if (this.optionsMenu.nativeElement.style.display !== 'none') return;
    this.routingService.navigate(['deck', this.deck.deckPublicId]);
  }

  public deckRightClicked(event: MouseEvent): void {
    event.preventDefault();
    const x = event.layerX;
    const y = event.layerY;
    this.toggleMenu(x, y);
  }

  public optionsButtonClicked(event: MouseEvent) {
    event.stopPropagation();
    const x = this.optionsButton.nativeElement.offsetLeft + 10;
    const y = this.optionsButton.nativeElement.offsetTop + 15;
    this.toggleMenu(x, y);
  }

  private toggleMenu(x: number, y: number) {

    this.optionsMenu.nativeElement.style.left = `${x}px`;
    this.optionsMenu.nativeElement.style.top = `${y}px`;

    if (this.optionsMenu.nativeElement.style.display === 'none') {
      this.optionsMenu.nativeElement.style.display = 'grid';
    } else {
      this.optionsMenu.nativeElement.style.display = 'none';
    }

  }

}