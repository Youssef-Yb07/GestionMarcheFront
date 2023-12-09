import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tache} from "../../Classes/tache";
import {Observable} from "rxjs";
import {TaskDTO} from "../../Classes/task-dto";

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private BaseUrl="http://localhost:8081/api/v1/taches";
  constructor(private httpClient:HttpClient) { }
  getAllTaches():Observable<Tache[]> {
    return this.httpClient.get<Tache[]>(this.BaseUrl+"/get/all");
  }
  updateState(idTask: number, stateTask: string):Observable<Tache> {
    return this.httpClient.patch<Tache>(`${this.BaseUrl}/update/state?idTask=${idTask}&stateTask=${stateTask}`, null);
  }
  createTache(tache:TaskDTO):Observable<TaskDTO> {
    return this.httpClient.post<TaskDTO>(this.BaseUrl+"/create", tache);
  }

  assignTaskToProject(idTask: number, idProject: number):Observable<Tache> {
    return this.httpClient.patch<Tache>(`${this.BaseUrl}/assign/to/project?idTask=${idTask}&idProject=${idProject}`, null);
  }
  getTasksNotAffectedToProject():Observable<Tache[]> {
    return this.httpClient.get<Tache[]>(this.BaseUrl+"/get/not/affected/to/project");
  }
  getTasksNotAffectedToEmployee():Observable<Tache[]> {
    return this.httpClient.get<Tache[]>(this.BaseUrl+"/get/not/affected/to/employee");
  }
  assignTaskToEmployee(idTask: number, idEmployee: number):Observable<Tache> {
    return this.httpClient.patch<Tache>(`${this.BaseUrl}/assign/to/employee?idTask=${idTask}&idEmployee=${idEmployee}`, null);
  }
}
