import { Injectable, inject } from '@angular/core';
import { SessionApiService } from '../backend/session-api.service';
import { SessionInfoModel } from '../../../../shared/models/sessions/session-info.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionFacadeService {

  private sessionApiService = inject(SessionApiService);

  public sessionInfo(): Observable<SessionInfoModel> {
    return this.sessionApiService.sessionInfo();
  }

}