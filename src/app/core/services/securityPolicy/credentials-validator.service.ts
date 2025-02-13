import { Injectable, inject } from '@angular/core';
import { LocalizationService } from '../localization.service';
import { CredentialsValidationResult } from '../../interfaces/credentials-validation-result.interface';
import { CredentialsValidationRule } from '../../interfaces/credentials-validation-rule.interface';

@Injectable({
  providedIn: 'root'
})
export class CredentialsValidatorService {

  private localizationService = inject(LocalizationService);

  public validate(validationRules: CredentialsValidationRule[], strToValidate: string): CredentialsValidationResult {

    for (const rule of validationRules) {
      const validationResult = this.check(rule, strToValidate);
      if (!validationResult.isValid)
        return validationResult;
    }

    return { isValid: true };

  }

  private check(validationRule: CredentialsValidationRule, username: string): CredentialsValidationResult {

    if (!validationRule.checkFunction(username))  {
      const msg = validationRule.errorSecondPart ?
            this.msgTranslate(validationRule.errorTranslateKey) + validationRule.errorSecondPart :
            this.msgTranslate(validationRule.errorTranslateKey);

      return { 
        isValid: false,
        message: msg
      };

    }
    return { isValid: true };

  }

  private msgTranslate(translateKey: string) {
    return this.localizationService.getTranslate(translateKey);
  }

}