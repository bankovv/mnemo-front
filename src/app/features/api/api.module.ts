import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SecurityPolicyFacadeService } from './services/facades/security-policy-facade.service';
import { LocalizationApiService } from './services/backend/localization-api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    LocalizationApiService,
    SecurityPolicyFacadeService
  ]
})
export class ApiModule { }