import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly baseUrl: string = `${environment.apiUrl}/courses`;
  constructor(private http:HttpClient) { }

  public getAllCourses(){
    return this.http.get<any>(`${this.baseUrl}`);
  }
}
