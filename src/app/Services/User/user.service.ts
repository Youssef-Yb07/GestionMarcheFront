import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../Classes/user";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BaseUrl = 'http://localhost:8081/api/v1/users';
  constructor(private httpClient:HttpClient) { }
  getAllEmployees():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.BaseUrl}/get/Employees`);
  }
  getAllDirectorsNotAffected():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.BaseUrl}/get/director/not/affected`);
  }
  getAllChiefServiceNotAffected():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.BaseUrl}/get/chiefService/not/affected`);
  }
  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.BaseUrl}/auth`, {email, password});
  }
  getUserById(idUser:number):Observable<User>{
    return this.httpClient.get<User>(`${this.BaseUrl}/get/${idUser}`);
  }

  getAllEmployeesByProject(idProject:number):Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.BaseUrl}/get/Employees/by/project/${idProject}`);
  }
  getAllEmployeesNotMemberInProject(idProject:number):Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.BaseUrl}/get/Employees/not/member/in/project/${idProject}`);
  }

}
