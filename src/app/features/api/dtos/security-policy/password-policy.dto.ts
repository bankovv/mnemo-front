export interface PasswordPolicyDto {
  minLength: number,
  maxLength: number,
  flags: { [key: string]: string },
  specialCharacters: string[]
}