import { Injectable, inject } from '@angular/core';
import { CredentialsValidationResult } from '../../interfaces/credentials-validation-result.interface';
import { UsernamePolicyModel } from '../../../shared/models/security-policy/username-policy.model';
import { SecurityPolicyFacadeService } from '../../../features/api/services/facades/security-policy-facade.service';
import { CredentialsValidatorService } from './credentials-validator.service';
import { CredentialsValidationRule } from '../../interfaces/credentials-validation-rule.interface';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidatorService {

  private securityPolicyFacade = inject(SecurityPolicyFacadeService);
  private securityPolicy!: UsernamePolicyModel;

  private credentialsValidator = inject(CredentialsValidatorService);
  private validationRules!: Array<CredentialsValidationRule>;

  constructor() {
    this.securityPolicyFacade.getUsernamePolicy().subscribe(policy => {
      this.securityPolicy = policy;
      this.initValidationRules();
    });
  }

  private initValidationRules() {

    this.validationRules = [

      // Emptiness
      {
        checkFunction: this.checkEmpty.bind(this),
        errorTranslateKey: 'credentialsValidation.error.requiredField'
      },

      // Length
      {
        checkFunction: this.checkMinLength.bind(this),
        errorTranslateKey: 'usernameValidation.error.minLength',
        errorSecondPart: this.securityPolicy.minLength + ''
      },
      {
        checkFunction: this.checkMaxLength.bind(this),
        errorTranslateKey: 'usernameValidation.error.maxLength',
        errorSecondPart: this.securityPolicy.maxLength + ''
      },

      // Usernames
      {
        checkFunction: this.checkForbiddenUsernames.bind(this),
        errorTranslateKey: 'usernameValidation.error.forbiddenUsername'
      },

      // Words
      {
        checkFunction: this.checkForbiddenWords.bind(this),
        errorTranslateKey: 'usernameValidation.error.forbiddenWord'
      },

      // Alphabets
      {
        checkFunction: this.checkAlphabets.bind(this),
        errorTranslateKey: 'usernameValidation.error.forbiddenCharacters'
      },

      // Flags
      {
        checkFunction: this.checkSpaces.bind(this),
        errorTranslateKey: 'usernameValidation.error.spaces'
      },

      {
        checkFunction: this.checkOnlyDigits.bind(this),
        errorTranslateKey: 'usernameValidation.error.onlyDigits'
      }

    ]
 
  }

  public validateUsername(username: string): CredentialsValidationResult {
    return this.credentialsValidator.validate(this.validationRules, username);
  }

  private checkEmpty(username: string) {
    const name = username.replace(/ /g, '');
    return name.length > 0;
  }

  private checkMinLength(username: string) {
    return username.length >= this.securityPolicy.minLength;
  }

  private checkMaxLength(username: string) {
    return username.length <= this.securityPolicy.maxLength;
  }

  private checkForbiddenUsernames(username: string) {
    for (const name of this.securityPolicy.forbiddenUsernames) {
      if (username.toLowerCase() === name.toLowerCase())
        return false;
    }
    return true;
  }

  private checkForbiddenWords(username: string) {
    for (const word of this.securityPolicy.forbiddenWords)
      if (username.toLowerCase().includes(word.toLowerCase()))
        return false;
    return true;
  }

  private checkAlphabets(username: string) {

    const escapedAllowed = this.securityPolicy.allowedCharacters.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('');
    const regex = new RegExp(`[0-9${escapedAllowed}]`, 'g');

    const onlyAlphabetUsername = username.replace(regex, '').replace(' ', '');
    if (onlyAlphabetUsername.length == 0) return true;

    const allowedAlphabets = this.securityPolicy.allowedAlphabets.join('');
    const alphabetsRegex = new RegExp(`^[${allowedAlphabets}]+$`, 'g');

    return alphabetsRegex.test(onlyAlphabetUsername);

  }

  private checkSpaces(username: string) {
    if (this.securityPolicy.flags.get('allowSpaces')) return true;
    return !username.includes(' ');
  }

  private checkOnlyDigits(username: string) {
    if (this.securityPolicy.flags.get('allowOnlyDigits')) return true;
    return !/^\d*$/.test(username);
  }

}