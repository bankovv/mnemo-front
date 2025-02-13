import { Injectable } from '@angular/core';
import { EmailPolicyDto } from '../../../dtos/security-policy/email-policy.dto';
import { EmailPolicyModel } from '../../../../../shared/models/security-policy/email-policy.model';

@Injectable({
  providedIn: 'root'
})
export class EmailPolicyMapperService {

  public createPolicyModel(emailPolicyDto: EmailPolicyDto): EmailPolicyModel {
    return {
      ... emailPolicyDto
    }
  }

}