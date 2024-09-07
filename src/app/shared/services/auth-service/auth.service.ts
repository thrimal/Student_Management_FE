import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  public userLogin(data: any) {
    return this.http.post<any>(this.baseUrl + '/login', data);
  }

  public userSignUp(data: any) {
    return this.http.post<any>(this.baseUrl + '/signup', data);
  }

  public findUserById(id: number) {
    return this.http.get<any>(this.baseUrl + `/byId/${id}`);
  }
}
