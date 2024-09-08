import { Component, OnInit } from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {FormControl, Validators} from "@angular/forms";
import {CourseService} from "../../../../../shared/services/course-service/course.service";
import {UserService} from "../../../../../shared/services/user-service/user.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {
  course: any= new FormControl('', Validators.required);
  name: any = new FormControl({value:'', disabled:true});
  email: any = new FormControl({value:'', disabled:true});
  contactNumber: any = new FormControl({value:'', disabled:true});
  address: any = new FormControl({value:'', disabled:true});
  enrollmentDate: any = new FormControl('')
  enrollments: any=[];
  courses: any =[];
  dob: any = new FormControl({value:'', disabled:true});
  minDate: Date;
  maxDate: Date;

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private cookieService: CookieService
  ) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(new Date());
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    let userId = parseInt(<string>this.cookieService.get("userId"));
    this.getAllCourses();
    this.findUser(userId);
  }

  findUser(userId:number){
    this.userService.findUser(userId).subscribe((res:any)=>{
      if(!res.hasError){
        this.name.setValue(res.data.name);
        this.address.setValue(res.data.address);
        this.contactNumber.setValue(res.data.phone);
        this.dob.setValue(res.data.dob);
        this.email.setValue(res.data.email);
      }
    },error => {
      console.log(error);
    })
  }

  getAllCourses(){
    this.courseService.getAllCourses().subscribe((res:any)=>{
      if(!res.hasError){
        this.courses = res.data;
      }
    }, error => {
      console.log(error);
    })
  }

  saveEnrollments() {

  }

  clearEnrollmentFields() {
  }

  handleCourseSelection($event: MatSelectChange) {

  }

  getErrorMessage() {

  }

  addRecordsToTheTable() {

  }
}
