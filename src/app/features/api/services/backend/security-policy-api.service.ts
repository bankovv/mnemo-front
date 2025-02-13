import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordPolicyDto } from '../../dtos/security-policy/password-policy.dto';
import { API_CONFIG } from '../../config/api-config';
import { UsernamePolicyDto } from '../../dtos/security-policy/username-policy.dto';
import { EmailPolicyDto } from '../../dtos/security-policy/email-policy.dto';

@Injectable({
  providedIn: 'root'
})
export class SecurityPolicyApiService {

  private http = inject(HttpClient);
  private apiUrl = API_CONFIG.securityPolicy;

  public getUsernamePolicy(): Observable<UsernamePolicyDto> {
    return this.http.get<UsernamePolicyDto>(this.apiUrl + '/username-policy');
  }

  public getEmailPolicy(): Observable<EmailPolicyDto> {
    return this.http.get<EmailPolicyDto>(this.apiUrl + "/email-policy");
  }

  public getPasswordPolicy(): Observable<PasswordPolicyDto> {
    return this.http.get<PasswordPolicyDto>(this.apiUrl + '/password-policy');
  }

}