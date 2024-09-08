import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl: string = `${environment.apiUrl}/users`;

  constructor() { }
}
