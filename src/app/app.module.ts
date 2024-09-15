import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpManagerInterceptor} from "./core/interceptor/http-manager.interceptor";
import {CookieService} from "ngx-cookie-service";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:HttpManagerInterceptor, multi:true},
    CookieService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
