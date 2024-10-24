import { routes } from './app/app.routes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { RouterModule, Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/domains/login/login.component';
import { HomeComponent } from './app/domains/home/home.component';
import { RegisterComponent } from './app/domains/register/register.component';
import { ProfileComponent } from './app/domains/profile/profile.component';
import { HeaderComponent } from './app/component/header/header.component';


@NgModule({
declarations: [
  LoginComponent,
  HomeComponent,
  RegisterComponent,
  ProfileComponent,
  AppComponent,
  HeaderComponent

 
], 
imports:[
  CommonModule,
  BrowserModule,
  FormsModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  ToastrModule.forRoot(),
  RouterModule.forRoot(routes),
  HttpClientModule
],

providers: [],


exports:[

],
bootstrap: [AppComponent]

})


export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)

  .catch(err => console.error(err));