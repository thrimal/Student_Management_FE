import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {CourseService} from "../../../../../shared/services/course-service/course.service";
import {UserService} from "../../../../../shared/services/user-service/user.service";
import {CookieService} from "ngx-cookie-service";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EnrollmentService} from "../../../../../shared/services/enrollment-service/enrollment.service";

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {
  course: FormControl = new FormControl('', [Validators.required]);
  name: FormControl = new FormControl({value: '', disabled: true});
  email: FormControl = new FormControl({value: '', disabled: true});
  contactNumber: FormControl = new FormControl({value: '', disabled: true});
  address: FormControl = new FormControl({value: '', disabled: true});
  enrollmentDate: FormControl = new FormControl('', [Validators.required]);
  dob: FormControl = new FormControl({value: '', disabled: true});
  enrollments: any[] = [];
  courses: any[] = [];
  minDate: Date;
  maxDate: Date;
  courseName: string = '';

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private cookieService: CookieService,
    private datePipe: DatePipe,
    private snackbar: MatSnackBar,
    private enrollmentService: EnrollmentService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    const userId = parseInt(<string>this.cookieService.get("userId"));
    this.getAllCourses();
    this.findUser(userId);
  }

  findUser(userId: number) {
    this.userService.findUser(userId).subscribe(
      (res: any) => {
        if (!res.hasError) {
          this.name.setValue(res.data.name);
          this.address.setValue(res.data.address);
          this.contactNumber.setValue(res.data.phone);
          this.dob.setValue(res.data.dob);
          this.email.setValue(res.data.email);
        } else {
          this.snackbar.open('Error fetching user data', 'Close', {duration: 3000});
        }
      },
      error => {
        console.log(error);
        this.snackbar.open('Unable to load user information', 'Close', {duration: 3000});
      }
    );
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      (res: any) => {
        if (!res.hasError) {
          this.courses = res.data;
        } else {
          this.snackbar.open('Error fetching courses', 'Close', {duration: 3000});
        }
      },
      error => {
        console.log(error);
        this.snackbar.open('Unable to load courses', 'Close', {duration: 3000});
      }
    );
  }

  // Save enrollment records to backend
  saveEnrollments() {
    if (this.enrollments.length > 0) {
      let data ={
        enrollments:this.enrollments
      }
      this.enrollmentService.saveEnrollment(data).subscribe(
        (res: any) => {
          if (!res.hasError) {
            this.snackbar.open('Enrollments saved successfully', 'Close', {duration: 3000});
            this.clearAll();
          } else {
            this.snackbar.open('Failed to save enrollments', 'Close', {duration: 3000});
          }
        },
        error => {
          console.log(error);
          this.snackbar.open('Error while saving enrollments', 'Close', {duration: 3000});
        }
      );
    } else {
      this.snackbar.open('No enrollments to save', 'Close', {duration: 3000});
    }
  }

  clearAll() {
    this.enrollments = [];
    this.course.reset();
    this.enrollmentDate.reset();
    this.course.markAsUntouched();
    this.enrollmentDate.markAsUntouched();
  }

  clearFields(){
    this.course.reset();
    this.enrollmentDate.reset();
    this.course.markAsUntouched();
    this.enrollmentDate.markAsUntouched();
  }

  handleCourseSelection() {
    const selectedCourse = this.courses.find((c: any) => c.course_id === this.course.value);
    this.courseName = selectedCourse ? selectedCourse.title : '';
  }

  getErrorMessage() {
    if (this.course.hasError('required')) {
      return 'Select course first';
    }
    if (this.enrollmentDate.hasError('required')) {
      return 'Select enrollment date';
    }
    return '';
  }

  addRecordsToTheTable() {
    this.course.markAsTouched();
    this.enrollmentDate.markAsTouched();
    const date = this.datePipe.transform(this.enrollmentDate.value, 'yyyy-MM-dd');
    const enrollment = {
      enrollment_id: 0,
      user_id: parseInt(this.cookieService.get("userId")),
      course_id: this.course.value,
      courseName: this.courseName,
      enrollment_date: date,
      customerName: this.name.value,
      customerContact: this.contactNumber.value,
      email: this.email.value,
      dob: this.dob.value,
      address: this.address.value
    };

    if (this.course.invalid || this.enrollmentDate.invalid) {
      this.snackbar.open('Invalid inputs...', 'Cancel', {duration: 3000});
    } else {
      const element = this.enrollments.find((e: any) => e.course_id === enrollment.course_id);
      if (!element) {
        this.enrollments.push(enrollment);
        this.clearFields();
        this.snackbar.open('Record added successfully', 'Close', {duration: 3000});
      } else {
        this.clearFields();
        this.snackbar.open("Record already exists...", 'Cancel', {duration: 3000});
      }
    }
  }
}
