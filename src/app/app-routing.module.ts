import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistrationComponent } from './features/auth/registration/registration.component';
import { SearchComponent } from './features/search/components/search/search.component';
import { OpenedDeckComponent } from './features/opened-deck/components/opened-deck/opened-deck.component';
import { CreateDeckComponent } from './features/create-deck/components/create-deck/create-deck.component';

const routes: Routes = [

  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },

  { path: 'search', component: SearchComponent },

  { path: 'create-deck', component: CreateDeckComponent },
  { path: 'deck/:publicId', component: OpenedDeckComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }