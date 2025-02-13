import { Injectable, inject } from '@angular/core';
import { SessionInfo } from '../interfaces/session-info.interface';
import { LoginModel } from '../../shared/models/auth/login.model';
import { AuthFacadeService } from '../../features/api/services/facades/auth-facade.service';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { AuthStatusModel } from '../../shared/models/auth/auth-status.model';
import { SessionFacadeService } from '../../features/api/services/facades/session-facade.service';
import { SessionInfoModel } from '../../shared/models/sessions/session-info.model';
import { RoutingService } from './routing.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private authFacade = inject(AuthFacadeService);
  private sessionFacade = inject(SessionFacadeService);
  private router = inject(RoutingService);

  private sessionInfo!: SessionInfo;
  private loggedIn: boolean = false;

  private onSessionUpdateList: Array<(isLoggedIn: boolean, sessionInfo: SessionInfo) => void> = [];

  public login(usernameOrEmail: string, password: string): Observable<LoginModel> {
    return this.authFacade.login(usernameOrEmail, password).pipe(
      switchMap((loginModel: LoginModel) => this.checkSession().pipe(map(() => loginModel))),
      tap((loginModel: LoginModel) => {
        if(loginModel.success) this.router.navigate(['/search'])
      })
    );
  }

  public checkSession(): Observable<SessionInfo> {
    return this.authFacade.status().pipe(
      map((status: AuthStatusModel) => status.authenticated),
      switchMap(authenticated => this.updateSession(authenticated))
    );
  }

  private updateSession(authenticated: boolean): Observable<SessionInfo> {

    if (authenticated) {
      this.loggedIn = true;

      return this.sessionFacade.sessionInfo().pipe(
        map((sessionInfo: SessionInfoModel) => {

          this.sessionInfo = {
            username: sessionInfo.username,
            role: sessionInfo.role
          }
          this.sessionUpdated();
          return this.sessionInfo;
        })

      );

    }

    this.loggedIn = false;
    this.sessionInfo = {username: '', role: ''}
    this.sessionUpdated();
    return of(this.sessionInfo);

  }

  private sessionUpdated() {
    this.onSessionUpdateList.forEach(task => task(this.loggedIn, this.sessionInfo));
  }

  public getSessionInfo(): SessionInfo {
    return this.sessionInfo;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public addOnSessionUpdate(onUpdate: (isLoggedIn: boolean, sessionInfo: SessionInfo) => void) {
    this.onSessionUpdateList.push(onUpdate);
  }

  public logout(): Observable<string> {
    return this.authFacade.logout().pipe(tap(() => {
      this.checkSession().subscribe();
      this.router.navigate(['search']);
    }));
  }

}