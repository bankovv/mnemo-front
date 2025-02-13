/**
 * Registration result mapped from RegisterRepsonse recieved from AuthApiService
 * 
 * @property {boolean} success Indicates if registration was successful
 * @property {string} message Message regarding registration process
 */
export interface RegisterModel {
  success: boolean,
  message: string
}