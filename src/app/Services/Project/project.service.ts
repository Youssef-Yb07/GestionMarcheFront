import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "../../Classes/project";
import StatusProjectEnum = Project.StatusProjectEnum;

@Injectable({
  providedIn: `root`
})
export class ProjectService {

  private BaseUrl = 'http://localhost:8081/api/v1/projets';
  constructor(private httpClient:HttpClient) { }

  createProjet(projet:Project) {
    return this.httpClient.post(`${this.BaseUrl}/create`, projet);
  }

  updateProjet(id: number, projet:Project) {
    return this.httpClient.put(`${this.BaseUrl}/update?idProject=${id}`, projet);
  }

  uploadCdc(id: number, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${this.BaseUrl}/upload/cdc?IdProject=${id}`, formData);
  }

  getProjectsByUser(idUser: number){
    return this.httpClient.get<Project[]>(`${this.BaseUrl}/get/by/user?idUser=${idUser}`)
  }
  getProjectsByStatut(statut: StatusProjectEnum){
    return this.httpClient.get<Project[]>(`${this.BaseUrl}/get/by/etat?statusProject=${statut}`)
  }
  getProjectsByDate(date: Date){
    return this.httpClient.get<Project[]>(`${this.BaseUrl}/get/by/date?date=${date}`)
  }
  getProjectsByBudget(budget: number){
    return this.httpClient.get<Project[]>(`${this.BaseUrl}/get/by/budget?budget=${budget}`)
  }
  getAllProjects(){
    return this.httpClient.get<Project[]>(`${this.BaseUrl}/get/all`)
  }
  downloadCDC(idProject: number): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders().append('Accept', 'application/octet-stream');
    return this.httpClient.get(`${this.BaseUrl}/download/cdc?IdProject=${idProject}`,
      {headers, observe: 'response', responseType: 'blob'});
  }
  deleteProjectByID(idProject : number){
    return this.httpClient.delete(`${this.BaseUrl}/delete?idProject=${idProject}`);
  }
  deleteAllProjects(){
    return this.httpClient.delete(`${this.BaseUrl}/delete/all`);
  }


}
