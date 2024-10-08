import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './domains/login/login.component';
import { HomeComponent } from './domains/home/home.component';
import { ProfileComponent } from './domains/profile/profile.component';
import { RegisterComponent } from './domains/register/register.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Dashboard', component: HomeComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }