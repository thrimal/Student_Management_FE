import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpManagerInterceptor implements HttpInterceptor {

  private static isAuthenticationRequest(request: HttpRequest<unknown>): boolean {
    return request.url.includes('login') || request.url.includes('signup');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (HttpManagerInterceptor.isAuthenticationRequest(request)) {
      return next.handle(request);
    }

    const token = localStorage.getItem("token");
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
