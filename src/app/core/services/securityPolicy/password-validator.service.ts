import { Injectable, inject } from '@angular/core';
import { SecurityPolicyFacadeService } from '../../../features/api/services/facades/security-policy-facade.service';
import { PasswordPolicyModel } from '../../../shared/models/security-policy/password-policy.model';
import { CredentialsValidatorService } from './credentials-validator.service';
import { CredentialsValidationRule } from '../../interfaces/credentials-validation-rule.interface'; import { CredentialsValidationResult } from '../../interfaces/credentials-validation-result.interface';
import { LocalizationService } from '../localization.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

  private securityPolicyFacade = inject(SecurityPolicyFacadeService);
  private passwordPolicy!: PasswordPolicyModel;

  private credentialsValidator = inject(CredentialsValidatorService);
  private validationRules!: Array<CredentialsValidationRule>;

  private localizationService = inject(LocalizationService);

  constructor() {
    this.securityPolicyFacade.getPasswordPolicy().subscribe(policy => {
      this.passwordPolicy = policy;
      this.initValidationRules();
    });
  }

  private initValidationRules() {

    this.validationRules = [

      // Emptiness
      {
        checkFunction: this.checkEmpty.bind(this),
        errorTranslateKey: 'credentialsValidation.error.requiredField',
      },

      // Length
      {
        checkFunction: this.checkMinLength.bind(this),
        errorTranslateKey: 'passwordValidation.error.minLength',
        errorSecondPart: this.passwordPolicy.minLength + ''
      },
      {
        checkFunction: this.checkMaxLength.bind(this),
        errorTranslateKey: 'passwordValidation.error.maxLength',
        errorSecondPart: this.passwordPolicy.maxLength + ''
      },

      // Cases
      {
        checkFunction: this.checkUpperCase.bind(this),
        errorTranslateKey: 'passwordValidation.error.upperCase'
      },
      {
        checkFunction: this.checkLowerCase.bind(this),
        errorTranslateKey: 'passwordValidation.error.lowerCase'
      },

      // Digits
      {
        checkFunction: this.checkDigits.bind(this),
        errorTranslateKey: 'passwordValidation.error.digits'
      },

      // Special Characters
      {
        checkFunction: this.checkSpecialCharacters.bind(this),
        errorTranslateKey: 'passwordValidation.error.specialCharacters'
      }

    ];

  }

  public validatePassword(password: string): CredentialsValidationResult {
    return this.credentialsValidator.validate(this.validationRules, password);
  }

  public validatePasswordConfirm(password: string, passwordConfirm: string): CredentialsValidationResult {

    if (passwordConfirm.length === 0 && password.length === 0)
      return {
        isValid: false,
        message: this.localizationService.getTranslate('credentialsValidation.error.requiredField')
      }

    if (password === passwordConfirm)
      return { isValid: true };
    else
      return {
        isValid: false,
        message: this.localizationService.getTranslate('passwordValidation.error.confirm')
      };

  }

  private checkEmpty(password: string): boolean {
    const noSpaces = password.replace(/ /g, '');
    return noSpaces.length >= 0;
  }

  private checkMinLength(password: string): boolean {
    return password.length >= this.passwordPolicy.minLength;
  }

  private checkMaxLength(password: string): boolean {
    return password.length <= this.passwordPolicy.maxLength;
  }

  private checkUpperCase(password: string): boolean {

    if (!this.passwordPolicy.flags.get('requireUpperCase')) return true;

    for (const char of password)
      if (char.toUpperCase() === char && char.toLowerCase() !== char)
        return true;

    return false;

  }

  private checkLowerCase(password: string): boolean {

    if (!this.passwordPolicy.flags.get('requireLowerCase')) return true;

    for (const char of password)
      if (char.toLowerCase() === char && char.toUpperCase() !== char)
        return true;

    return false;

  }

  private checkDigits(password: string): boolean {
    if (!this.passwordPolicy.flags.get('requireDigits')) return true;
    return /[0-9]/.test(password);
  }

  private checkSpecialCharacters(password: string): boolean {

    if (!this.passwordPolicy.flags.get('requireSpecialCharacters')) return true;

    for (const char of this.passwordPolicy.specialCharacters)
      if (password.includes(char))
        return true;
    
    return false;

  }

}