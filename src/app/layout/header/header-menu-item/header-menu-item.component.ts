import { Component, Input, inject, signal } from '@angular/core';
import { RoutingService } from '../../../core/services/routing.service';

@Component({
  selector: 'app-header-menu-item',
  templateUrl: './header-menu-item.component.html',
  styleUrl: './header-menu-item.component.css'
})
export class HeaderMenuItemComponent {

  @Input() translateKey!: string;
  @Input() routerLink!: string;

  selected = signal(false);

  private routingService = inject(RoutingService);

  constructor() {
    this.routingService.addOnRouteChange(event => {
      if (event.url !== this.routerLink) this.selected.set(false);
      else this.selected.set(true);
    });
  }

}