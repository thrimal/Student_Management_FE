import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private readonly baseUrl: string = `${environment.apiUrl}/enrollments`;
  constructor(private http: HttpClient) { }

  public saveEnrollment(data:any){
    return this.http.post<any>(`${this.baseUrl}`,data);
  }
}
