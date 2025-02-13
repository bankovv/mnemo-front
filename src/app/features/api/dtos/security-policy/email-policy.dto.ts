export interface EmailPolicyDto {
  regex: string,
  allowedDomains: string[],
  forbiddenDomains: string[] 
}