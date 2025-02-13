/**
 * Registration result dto received from API
 * 
 * @property {boolean} success Indicates if registration was successful
 * @property {string} message Message regarding registration process
 */
export interface RegisterResponse {
  success: boolean,
  message: string
}