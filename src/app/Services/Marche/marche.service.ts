import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Market} from "../../Classes/market";

@Injectable({
  providedIn: 'root'
})
export class MarcheService {

  private BaseUrl='http://localhost:8081/api/v1/markets'
  constructor(private httpClient:HttpClient) { }
  public getMarches():Observable<Market[]>{
    return this.httpClient.get<Market[]>(`${this.BaseUrl}/get/all`);
  }
}
