import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "../../Classes/project";
import StatusProjectEnum = Project.StatusProjectEnum;
import {ProjectDTO} from "../../Classes/project-dto";

@Injectable({
  providedIn: `root`
})
export class ProjectService {

  private BaseUrl = 'http://localhost:8081/api/v1/projets';
  constructor(private httpClient:HttpClient) { }

  createProjet(projet:ProjectDTO):Observable<ProjectDTO> {
    return this.httpClient.post<ProjectDTO>(`${this.BaseUrl}/create`, projet);
  }

  updateProjet(id: number, projet:Project):Observable<Project> {
    return this.httpClient.put<Project>(`${this.BaseUrl}/update?idProject=${id}`, projet);
  }

  uploadCdc(id: number, file: File):Observable<Project> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<Project>(`${this.BaseUrl}/upload/cdc?IdProject=${id}`, formData);
  }

  getProjectsByUser(idUser: number):Observable<Project[]>{
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
  assignTasksToProject(idProject: number, idTasks: number[]):Observable<Project> {
    const idTasksString = idTasks.join('&idTasks=');

    const url = `${this.BaseUrl}/assign/by/tasks?idProject=${idProject}&idTasks=${idTasksString}`;

    return this.httpClient.patch<Project>(url, null);
  }
  assignUsersToProject(idProject: number, idUsers: number[]):Observable<Project> {
      const idUsersString = idUsers.join('&idUsers=');

      const url = `${this.BaseUrl}/assign/users?idProject=${idProject}&idUsers=${idUsersString}`;

      return this.httpClient.patch<Project>(url, null);

    }




}
