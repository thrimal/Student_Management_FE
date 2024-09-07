import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../../shared/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  hide: boolean = true;
  hide2: boolean = true;
  role = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  dob = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required, Validators.minLength(3)]);
  contactNumber = new FormControl('', [Validators.required, Validators.minLength(10)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(4)]);

  constructor(
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    // private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    // this.spinner.show().then();
    setTimeout(() => {
      // this.spinner.hide().then();
    }, 1000);
  }

  userSignUp() {
    if (
      this.name.invalid ||
      this.email.invalid ||
      this.dob.invalid ||
      this.address.invalid ||
      this.contactNumber.invalid ||
      this.password.invalid ||
      this.confirmPassword.invalid
    ) {
      this.snackbar.open('Invalid inputs...', 'Cancel', {duration: 3000});
    } else {
      if (this.password.value !== this.confirmPassword.value) {
        this.snackbar.open('Verified passwords aren\'t match...', 'Cancel', {duration: 3000});
      } else {
        let data = {
          user_id: 0,
          name: this.name.value.trim(),
          email: this.email.value.trim(),
          dob: this.dob.value,
          address: this.address.value.trim(),
          phone: this.contactNumber.value.trim(),
          password: this.password.value.trim(),
          role: this.role.value.trim(),
        }
        this.authService.userSignUp(data)
          .subscribe((res: any) => {
              this.router.navigate(['/auth/login']).then(() => {
                this.snackbar.open(res.message, 'OK', {duration: 3000});
              });
            },
            err => {
              this.snackbar.open(err.error.object, 'Cancel', {duration: 3000});
            }
          )
      }
    }
  }

  handleRoleSelection($event: MatSelectChange){
    this.role.setValue($event.value);
    console.log(this.role.value)
  }

  getErrorMessage() {
    if (this.role.hasError('required')) {
      return 'Select role first';
    } else if (this.name.hasError('required')) {
      return 'You must enter a name';
    } else if (this.name.hasError('minlength')) {
      return 'Not a valid name';
    } else if (this.email.hasError('required')) {
      return 'You must enter an email address';
    } else if (this.email.hasError('email')) {
      return 'Not a valid email address';
    } else if (this.password.hasError('minlength')) {
      return 'Password must be at least 4 characters long';
    } else if (this.confirmPassword.hasError('required')) {
      return 'You must re enter a password';
    } else if (this.confirmPassword.hasError('minlength')) {
      return 'Password must be at least 4 characters long';
    } else {
      return '';
    }
  }

}
