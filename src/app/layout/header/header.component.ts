import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { Theme } from '../../core/enums/theme.enum';
import { AuthFacadeService } from '../../features/api/services/facades/auth-facade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


}