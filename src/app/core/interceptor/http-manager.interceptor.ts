import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable()
export class HttpManagerInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  private static isAuthenticationRequest(request: HttpRequest<unknown>): boolean {
    return request.url.includes('login') || request.url.includes('signup');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (HttpManagerInterceptor.isAuthenticationRequest(request)) {
      return next.handle(request);
    }

    const token = this.cookieService.get('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if the token has expired
      if (decodedToken.exp < currentTime) {
        console.error('Token has expired');
        this.cookieService.deleteAll('/');
        this.router.navigate(['/auth/login']).then(r => {});
        return throwError({ status: 401, message: 'Token expired' });
      }

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          console.warn('Unauthorized access, redirecting...');
          this.cookieService.deleteAll('/');
          this.router.navigate(['/auth/login']).then(r => {});
        }
        return throwError(error);
      })
    );
  }
}
