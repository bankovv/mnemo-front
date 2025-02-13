export interface UsernamePolicyDto {

  minLength: number,
  maxLength: number,

  forbiddenUsernames: string[],
  forbiddenWords: string[],
  forbiddenCharacters: string[],

  allowedAlphabets: string[],
  allowedCharacters: string[],

  flags: { [key: string]: string }

}