import { CredentialsValidationResult } from "./credentials-validation-result.interface";

export interface CredentialsValidationRule {
  checkFunction: ( (str: string) => boolean),
  errorTranslateKey: string,
  errorSecondPart?: string
}