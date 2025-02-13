import { Injectable } from '@angular/core';
import { PasswordPolicyDto } from '../../../dtos/security-policy/password-policy.dto';
import { PasswordPolicyModel } from '../../../../../shared/models/security-policy/password-policy.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordPolicyMapperService {

  public createModel(passwordPolicyDto: PasswordPolicyDto): PasswordPolicyModel {
    
    const flags = new Map<string, boolean>();
    for (const [key, value] of Object.entries(passwordPolicyDto.flags))
      flags.set(key, JSON.parse(value));

    return {
      ...passwordPolicyDto,
      flags: flags
    }

  }

}