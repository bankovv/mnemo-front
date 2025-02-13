import { Injectable, inject } from '@angular/core';
import { RegisterModel } from '../../../../shared/models/auth/register.model';
import { AuthApiService } from '../backend/auth-api.service';
import { RegisterRequest } from '../../dtos/auth/register-request.dto';
import { Observable, map, tap } from 'rxjs';
import { RegisterResponse } from '../../dtos/auth/register-response.dto';
import { LoginModel } from '../../../../shared/models/auth/login.model';
import { LoginRequest } from '../../dtos/auth/login-request.dto';
import { LoginResponse } from '../../dtos/auth/login-response.dto';
import { AuthStatusModel } from '../../../../shared/models/auth/auth-status.model';

/**
 * Service for handling user registration and authentication
 * 
 * @function register
 * Registers a new user with provided username, email and password
 * Maps RegisterResponse to RegisterModel if needed
 *
 * @function mapRegisterResponseToModel
 * Maps RegisterResponse to RegisterModel if needed 
 * (RegisterResponse structure differs from RegisterModel)
 * 
 * @function login
 * Authenticates user with providede username or email and password
 * Maps LoginRepsonse to LoginModel if needed
 * 
 * @function mapLoginResponseToModel
 * Maps LoginResponse to LoginModel if needed
 * (LoginResponse structure differs from LoginModel)
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  private authApiService = inject(AuthApiService);

  /**
   * Creates RegisterRequest from registration data and pass it to AuthApiService
   * Can also map received RegisterResponse from AuthApiService
   * to RegisterModel if needed (uncomment second return)
   * 
   * @param username 
   * @param email 
   * @param password 
   * @returns Observable of RegisterModel
   */
  public register(username: string, email: string, password: string): Observable<RegisterModel> {

    const registerRequest: RegisterRequest = {
      username: username,
      email: email,
      password: password
    }
    
    return this.authApiService.register(registerRequest);

    // Use this return if RegisterResponse structure differs from RegisterModel
    // return this.authApiService.register(registerRequest).pipe(
    //   map((resp: RegisterResponse) => this.mapRegisterResponseToModel(resp))
    // );

  }

  /**
   * Maps RegisterResponse to RegisterModel
   * Use this function if RegisterResponse and RegisterModel structures become different
   * 
   * @param registerResponse Response returned from API
   * @returns RegisterModel mapped from registerResponse
   */
  private mapRegisterResponseToModel(registerResponse: RegisterResponse): RegisterModel {
    const model: RegisterModel = { ... registerResponse };
    return model;
  }

  /**
   * Creates LoginRequest from login data and pass it to AuthApiService
   * Can also map received LoginResponse from AuthApiService 
   * to LoginModel if needed (uncomment second return)
   * 
   * @param usernameOrEmail 
   * @param password 
   * @returns 
   */
  public login(usernameOrEmail: string, password: string): Observable<LoginModel> {

    const loginRequest: LoginRequest = {
      usernameOrEmail: usernameOrEmail,
      password: password
    }

    return this.authApiService.login(loginRequest);

    // Use this return if LoginResponse structure differs from LoginModel
    // return this.authApiService.login(loginRequest).pipe(
    //   map((resp: LoginResponse) => this.mapLoginResponseToModel(resp))
    // );

  }

  /**
   * Maps LoginResponse to LoginModel
   * Use this function if LoginResponse and LoginModel structures become different
   * 
   * @param loginResponse Response returned from API
   * @returns LoginModel mapped from loginResponse
   */
  private mapLoginResponseToModel(loginResponse: LoginResponse): LoginModel {
    const model: LoginModel = { ... loginResponse };
    return model;
  }

  public logout(): Observable<string> {
    return this.authApiService.logout();
  }

  public status(): Observable<AuthStatusModel> {
    // return this.authApiService.status().pipe(tap((status: AuthStatusModel) => console.log(status)));
    return this.authApiService.status();
  }

}