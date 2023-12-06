import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../Classes/project";

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private BaseUrl = 'http://localhost:8081/api/v1/projets';
  constructor(private httpClient:HttpClient) { }

  createProjet(projet:Project): Observable<Project> {
    return this.httpClient.post(`${this.BaseUrl}/create`, projet);
  }

  updateProjet(id: number, projet:Project): Observable<Project> {
    return this.httpClient.put(`${this.BaseUrl}/update?idProject=${id}`, projet);
  }

  uploadCdc(id: number, file: File): Observable<Project> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${this.BaseUrl}/upload/cdc?IdProject=${id}`, formData);
  }


}
