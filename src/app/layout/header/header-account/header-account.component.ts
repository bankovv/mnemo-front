import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../core/services/session.service';
import { SessionInfo } from '../../../core/interfaces/session-info.interface';

@Component({
  selector: 'app-header-account',
  templateUrl: './header-account.component.html',
  styleUrl: './header-account.component.css'
})
export class HeaderAccountComponent {

  @ViewChild('accountButton')
  public accountButton!: ElementRef;

  @ViewChild('settingsDialog')
  public settingsDialog!: ElementRef;

  private sessionService = inject(SessionService);
  private router = inject(Router);

  public username = signal('');

  ngAfterViewInit() {

    document.addEventListener("click", (event) => {

      const element = document.elementFromPoint(event.x, event.y);

      if (this.settingsDialog.nativeElement.open && element !== this.settingsDialog.nativeElement)
        this.settingsDialog.nativeElement.close();

    });

  }



  ngOnInit() {
    this.sessionService.addOnSessionUpdate((isLoggedIn: boolean, sessionInfo: SessionInfo) => this.sessionUpdated(isLoggedIn, sessionInfo));
  }

  private sessionUpdated(isLoggedIn: boolean, sessionInfo: SessionInfo) {
      if(isLoggedIn) {
        this.username.set(sessionInfo.username);
        this.accountButton.nativeElement.innerHTML = sessionInfo.username[0].toUpperCase();
      }
  }

  public isLoggedIn() {
    return this.sessionService.isLoggedIn();
  }

  public loginButtonClicked() {
    this.router.navigate(['/login']);
  }

  public registerButtonClicked() {
    this.router.navigate(['/register']);
  }

  public logout() {
    this.sessionService.logout().subscribe(resp => console.log(resp));
  }

    public settingsButtonClicked(event: MouseEvent) {
    if (this.settingsDialog.nativeElement.open) {
      this.settingsDialog.nativeElement.close();
    } else {
      this.settingsDialog.nativeElement.show();
    }
    event.stopPropagation();
  }

  public settingsDivClicked(event: MouseEvent) {
    event.stopPropagation();
  }

  public isPopupOpened() {
    return this.settingsDialog.nativeElement.open;
  }

}