import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tache} from "../../Classes/tache";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private BaseUrl="http://localhost:8081/api/v1/taches";
  constructor(private httpClient:HttpClient) { }
  getAllTaches():Observable<Tache[]> {
    return this.httpClient.get<Tache[]>(this.BaseUrl+"/get/all");
  }
}
