import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private readonly baseUrl: string = `${environment.apiUrl}/enrollments`;
  constructor() { }
}
