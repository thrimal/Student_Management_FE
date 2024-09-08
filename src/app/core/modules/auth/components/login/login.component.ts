import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../../../shared/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private cookieService: CookieService
    // private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
  }

  userLogin() {
    if (this.email.invalid || this.password.invalid) {
      this.snackbar.open('Invalid inputs...', 'Cancel', {duration: 3000});
    } else {
      let data: any = {
        email: this.email.value.trim(),
        password: this.password.value.trim()
      };
      this.authService.userLogin(data).subscribe(
        (res: any) => {
          if (!res.hasError) {
            this.cookieService.set('isLoggedIn', 'true');
            this.cookieService.set('token', res.token,{
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),// expires in 7 days
              path: '/',
              secure: true, // use only over HTTPS
              sameSite: 'Lax'
            });
            this.cookieService.set('role', res.data.role);
            this.cookieService.set('userId', res.data.user_id);
            this.router.navigate(['/user/enrollment']).then(() => {
              setTimeout(() => {
                this.snackbar.open(res.message + " logged in as a " + res.data.role, 'OK', {duration: 2000});
              }, 1000);
            });
          } else {
            this.handleFailedLogin(res.message);
          }
        },
        err => {
          this.handleFailedLogin(err.error.object);
        }
      );
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email address';
    } else if (this.email.hasError('email')) {
      return 'Not a valid email address';
    } else if (this.password.hasError('required')) {
      return 'You must enter a password';
    } else if (this.password.hasError('minlength')) {
      return 'Password must be at least 4 characters';
    } else {
      return '';
    }
  }

  private handleFailedLogin(errorMessage: string) {
    this.cookieService.deleteAll();
    this.router.navigate(['/auth/login']).then(() => {
      this.snackbar.open(errorMessage, 'Cancel', {duration: 3000});
    });
  }
}
