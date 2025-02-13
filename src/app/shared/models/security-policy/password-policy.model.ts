export interface PasswordPolicyModel {
  minLength: number,
  maxLength: number,
  flags: Map<string, boolean>,
  specialCharacters: string[]
}