import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthFacadeService } from '../../api/services/facades/auth-facade.service';
import { LoginModel } from '../../../shared/models/auth/login.model';
import { LocalizationService } from '../../../core/services/localization.service';
import { RoutingService } from '../../../core/services/routing.service';
import { SessionService } from '../../../core/services/session.service';
import { SessionInfo } from '../../../core/interfaces/session-info.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth-inputs.style.css']
})
export class LoginComponent {

  @ViewChild('invalidCredentialsMessage')
  private invalidCredentialMessageTag!: ElementRef;

  private sessionService = inject(SessionService);
  private localizationService = inject(LocalizationService);

  public loginBlink = signal(false);
  public passwordBlink = signal(false);

  public loginForm = new FormGroup( {
      login: new FormControl(''),
      password: new FormControl('')
    }
  );

  public login() {

    const loginOrEmail = this.loginForm.get('login')?.value;
    const password = this.loginForm.get('password')?.value;

    if (!loginOrEmail) {
      this.loginBlink.set(true);
      setTimeout(() => {
        this.loginBlink.set(false);
      }, 500);
      return;
    }

    if (!password) {
      this.passwordBlink.set(true);
      setTimeout(() => {
        this.passwordBlink.set(false);
      }, 500);
      return;
    }

    this.sessionService.login(loginOrEmail, password).subscribe((loginModel: LoginModel) => {

      if (!loginModel.success) {

        this.invalidCredentialMessageTag.nativeElement.innerText = this.localizationService.getTranslate(loginModel.messageTranslateKey);
        setTimeout(() => {
          this.invalidCredentialMessageTag.nativeElement.innerText = '';
        }, 2500);

      }

    });

  }

}