import { Component, ElementRef, Signal, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { UsernameValidatorService } from '../../../core/services/securityPolicy/username-validator.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { EmailValidatorService } from '../../../core/services/securityPolicy/email-validator.service';
import { CredentialsValidationResult } from '../../../core/interfaces/credentials-validation-result.interface';
import { PasswordValidatorService } from '../../../core/services/securityPolicy/password-validator.service';
import { AuthApiService } from '../../api/services/backend/auth-api.service';
import { AuthFacadeService } from '../../api/services/facades/auth-facade.service';
import { RegisterModel } from '../../../shared/models/auth/register.model';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../auth-inputs.style.css']
})
export class RegistrationComponent {

  @ViewChild('invalidUsername') invalidUsernameMsgTag!: ElementRef;
  @ViewChild('invalidEmail') invalidEmailMsgTag!: ElementRef;
  @ViewChild('invalidPassword') invalidPasswordMsgTag!: ElementRef;
  @ViewChild('invalidConfirmPassword') invalidConfirmPasswordMsgTag!: ElementRef;
  @ViewChild('registrationErrorMessage') registrationErrorMessageTag!: ElementRef;

  public loginValid = signal(true);
  public emailValid = signal(true);
  public passwordValid = signal(true);
  public confirmPasswordValid = signal(true);

  public blinkLogin = signal(false);
  public blinkEmail = signal(false);
  public blinkPassword = signal(false);
  public blinkConfirmPassword = signal(false);

  private usernameValidator = inject(UsernameValidatorService);
  private emailValidator = inject(EmailValidatorService);
  private passwordValidator = inject(PasswordValidatorService);

  private authService = inject(AuthFacadeService);

  public registerForm = new FormGroup(
    {
      login: new FormControl(''),
      email: new FormControl(''),
      passwordGroup: new FormGroup(
        {
          password: new FormControl(''),
          confirmPassword: new FormControl('')
        }
      )
    }
  );

  ngOnInit() {
    this.addValidation('login', this.checkUsername.bind(this));
    this.addValidation('email', this.checkEmail.bind(this));
    this.addValidation('passwordGroup.password', this.checkPassword.bind(this));
    this.addValidation('passwordGroup.confirmPassword', this.checkConfirmPassword.bind(this));
  }

  private addValidation(inputKey: string, validationFunc: (str: string) => void) {
    this.registerForm.get(inputKey)?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(str => validationFunc(str));
  }

  private checkUsername(username: string): boolean {
    const validationResult = this.usernameValidator.validateUsername(username);
    this.applyValidation(validationResult, this.loginValid, this.blinkLogin, this.invalidUsernameMsgTag);
    return validationResult.isValid;
  }

  private checkEmail(email: string): boolean {
    const validationResult = this.emailValidator.validateEmail(email);
    this.applyValidation(validationResult, this.emailValid, this.blinkEmail, this.invalidEmailMsgTag);
    return validationResult.isValid;
  }

  private checkPassword(password: string): boolean {
    const validationResult = this.passwordValidator.validatePassword(password);
    this.applyValidation(validationResult, this.passwordValid, this.blinkPassword, this.invalidPasswordMsgTag);
    return validationResult.isValid;
  }

  private checkConfirmPassword(confirmPassword: string): boolean {
    const password = this.registerForm.get('passwordGroup.password')?.value;
    const validationResult = this.passwordValidator.validatePasswordConfirm(password!, confirmPassword);
    this.applyValidation(validationResult, this.confirmPasswordValid, this.blinkConfirmPassword, this.invalidConfirmPasswordMsgTag);
    return validationResult.isValid;
  }

  private applyValidation(validationResult: CredentialsValidationResult, validationSignal: WritableSignal<boolean>, blinkSignal: WritableSignal<boolean>, validationTag: ElementRef) {

    if (validationResult.isValid) {
      validationTag.nativeElement.innerText = '';
      validationSignal.set(true);
    } else {

      validationTag.nativeElement.innerText = validationResult.message;

      blinkSignal.set(true);
      setTimeout(() => {
        blinkSignal.set(false);
        validationSignal.set(validationResult.isValid);
      }, 500);

    }

  }

  public submitForm() {

    if (this.checkAllInputs()) {

      const username = this.registerForm.get('login')?.value!;
      const email = this.registerForm.get('email')?.value!;
      const password = this.registerForm.get('passwordGroup.password')?.value!;

      this.authService.register(username, email, password).subscribe({

        next: (resp: RegisterModel) => {
          console.log(resp);
        },

        error: err => {

          this.registrationErrorMessageTag.nativeElement.innerText = err.error.message;
          setTimeout(() => {
            this.registrationErrorMessageTag.nativeElement.innerText = "";
          }, 2500);

        }

      });

    }

  }

  private checkAllInputs(): boolean {

    const username = this.registerForm.get('login')?.value!;
    const email = this.registerForm.get('email')?.value!;
    const password = this.registerForm.get('passwordGroup.password')?.value!;
    const confirmPassword = this.registerForm.get('passwordGroup.confirmPassword')?.value!;

    const checkLogin = this.checkUsername(username)
    const checkEmail = this.checkEmail(email)
    const checkPassword = this.checkPassword(password)
    const checkConfirm = this.checkConfirmPassword(confirmPassword)

    return checkLogin && checkEmail && checkPassword && checkConfirm;

  }

}