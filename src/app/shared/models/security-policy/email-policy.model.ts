export interface EmailPolicyModel {
  regex: string,
  allowedDomains: string[],
  forbiddenDomains: string[] 
}