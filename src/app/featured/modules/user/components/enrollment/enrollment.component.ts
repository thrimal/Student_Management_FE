import { Component, OnInit } from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {FormControl, Validators} from "@angular/forms";
import {CourseService} from "../../../../../shared/services/course-service/course.service";

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

  constructor(private courseService: CourseService) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(new Date());
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    this.getAllCourses();
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

  saveEnrollment() {

  }

  clearEnrollmentFields() {
    this.name.setValue("kamal")
  }

  handleCourseSelection($event: MatSelectChange) {

  }

  getErrorMessage() {

  }
}
