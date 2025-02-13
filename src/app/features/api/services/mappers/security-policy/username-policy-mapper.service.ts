import { Injectable } from '@angular/core';
import { UsernamePolicyModel } from '../../../../../shared/models/security-policy/username-policy.model';
import { UsernamePolicyDto } from '../../../dtos/security-policy/username-policy.dto';

@Injectable({
  providedIn: 'root'
})
export class UsernamePolicyMapperService {

  public createPolicyModel(usernamePolicyDto: UsernamePolicyDto): UsernamePolicyModel {

    const flags = new Map<string, boolean>();
    for (const [key, value] of Object.entries(usernamePolicyDto.flags))
      flags.set(key, JSON.parse(value));

    return {
      ...usernamePolicyDto,
      flags: flags
    }

  }

}