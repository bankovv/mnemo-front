import { Injectable, inject } from '@angular/core';
import { CredentialsValidationRule } from '../../interfaces/credentials-validation-rule.interface';
import { SecurityPolicyFacadeService } from '../../../features/api/services/facades/security-policy-facade.service';
import { EmailPolicyModel } from '../../../shared/models/security-policy/email-policy.model';
import { CredentialsValidatorService } from './credentials-validator.service';
import { CredentialsValidationResult } from '../../interfaces/credentials-validation-result.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {

  private securityPolicyFacade = inject(SecurityPolicyFacadeService);
  private emailPolicy!: EmailPolicyModel;

  private credentialsValidator = inject(CredentialsValidatorService);
  private validationRules!: Array<CredentialsValidationRule>;

  constructor() {
    this.securityPolicyFacade.getEmailPolicy().subscribe(policy => {
      this.emailPolicy = policy;
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
      
      // Format
      {
        checkFunction: this.checkFormat.bind(this),
        errorTranslateKey: 'emailValidation.error.format'
      },

      // Domains
      {
        checkFunction: this.checkAllowedDomains.bind(this),
        errorTranslateKey: 'emailValidation.error.forbiddenDomain'
      },
      {
        checkFunction: this.checkForbiddenDomains.bind(this),
        errorTranslateKey: 'emailValidation.error.forbiddenDomain'
      }

    ];

  }

  public validateEmail(email: string): CredentialsValidationResult {
    return this.credentialsValidator.validate(this.validationRules, email);
  }

  private checkEmpty(email: string): boolean {
    const name = email.replace(/ /g, '');
    return name.length > 0;
  }

  private checkFormat(email: string): boolean {
    const regex = new RegExp(this.emailPolicy.regex);
    return regex.test(email);
  }

  private checkAllowedDomains(email: string): boolean {

    if (this.emailPolicy.allowedDomains.includes('*')) return true;

    for (const domain of this.emailPolicy.allowedDomains) {
      if (email.endsWith(domain)) return true;
    }
    return false;

  }

  private checkForbiddenDomains(email: string): boolean {
    for (const domain of this.emailPolicy.forbiddenDomains)
      if (email.endsWith(domain)) return false;
    return true;
  }


}