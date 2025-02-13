import { Injectable, inject } from '@angular/core';
import { SecurityPolicyApiService } from '../backend/security-policy-api.service';
import { UsernamePolicyMapperService } from '../mappers/security-policy/username-policy-mapper.service';
import { Observable, map } from 'rxjs';
import { UsernamePolicyModel } from '../../../../shared/models/security-policy/username-policy.model';
import { EmailPolicyMapperService } from '../mappers/security-policy/email-policy-mapper.service';
import { EmailPolicyModel } from '../../../../shared/models/security-policy/email-policy.model';
import { PasswordPolicyMapperService } from '../mappers/security-policy/password-policy-mapper.service';
import { PasswordPolicyModel } from '../../../../shared/models/security-policy/password-policy.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityPolicyFacadeService {

  private securityApi = inject(SecurityPolicyApiService);

  private usernamePolicyMapper = inject(UsernamePolicyMapperService);
  private emailPolicyMapper = inject(EmailPolicyMapperService);
  private passwordPolicyMapper = inject(PasswordPolicyMapperService);

  public getUsernamePolicy(): Observable<UsernamePolicyModel> {
    return this.securityApi.getUsernamePolicy().pipe(
        map(policyDto => this.usernamePolicyMapper.createPolicyModel(policyDto))
      );
  }

  public getEmailPolicy(): Observable<EmailPolicyModel> {
    return this.securityApi.getEmailPolicy().pipe(
      map(policyDto => this.emailPolicyMapper.createPolicyModel(policyDto))
    );
  }

  public getPasswordPolicy(): Observable<PasswordPolicyModel> {
    return this.securityApi.getPasswordPolicy().pipe(
      map(policyDto => this.passwordPolicyMapper.createModel(policyDto))
    );
  }

}