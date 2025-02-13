export interface UsernamePolicyModel {

  minLength: number,
  maxLength: number,

  forbiddenUsernames: string[],
  forbiddenWords: string[],
  forbiddenCharacters: string[],

  allowedAlphabets: string[],
  allowedCharacters: string[],

  flags: Map<string, boolean>

}