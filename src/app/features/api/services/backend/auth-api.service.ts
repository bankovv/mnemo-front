import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../../dtos/auth/register-response.dto';
import { RegisterRequest } from '../../dtos/auth/register-request.dto';
import { API_CONFIG } from '../../config/api-config';
import { LoginResponse } from '../../dtos/auth/login-response.dto';
import { LoginRequest } from '../../dtos/auth/login-request.dto';
import { AuthStatusResponse } from '../../dtos/auth/auth-status-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private http = inject(HttpClient);
  private apiUrl = API_CONFIG.authUrl;

  public register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiUrl + '/register', registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + '/login', loginRequest, { withCredentials: true });
  }

  public logout(): Observable<string> {
    return this.http.post<string>(this.apiUrl + '/logout', {}, { withCredentials: true });
  }

  public status(): Observable<AuthStatusResponse> {
    return this.http.get<AuthStatusResponse>(this.apiUrl + '/status', { withCredentials: true });
  }

}