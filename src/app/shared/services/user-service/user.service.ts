import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  public findUser(userId:number){
    return this.http.get<any>(`${this.baseUrl}/${userId}`);
  }
}
