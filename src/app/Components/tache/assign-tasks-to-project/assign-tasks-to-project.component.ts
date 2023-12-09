import {Component, OnInit} from '@angular/core';
import {TacheService} from "../../../Services/Tache/tache.service";
import {Tache} from "../../../Classes/tache";
import {Router} from "@angular/router";

@Component({
  selector: 'app-assign-tasks-to-project',
  templateUrl: './assign-tasks-to-project.component.html',
  styleUrls: ['./assign-tasks-to-project.component.scss']
})
export class AssignTasksToProjectComponent implements OnInit{

  tache!:Tache;
  taches:Tache[]= [];
  idProject!:number;
  successMessage:string;
  errorMessage:string;


  constructor(private tacheService:TacheService,private router:Router) {}

  ngOnInit(): void {
    this.idProject=Number(sessionStorage.getItem("idProject"));
    this.getTasks();
  }

  getTasks(){
    this.tacheService.getTasksNotAffectedToProject().subscribe(
      (response)=>{
        console.log(response);
        this.taches=response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  assignTaskToProject(idTask:number){
    this.tacheService.assignTaskToProject(idTask,this.idProject).subscribe(
      (response)=>{
        console.log(response);
        this.successMessage="Task assigned successfully";
        this.redirectAfterDelay();
      },
      (error)=>{
        console.log(error);
        this.errorMessage="Error while assigning task";
      }
    );
  }

  redirectAfterDelay() {
    setTimeout(() => {
      this.router.navigate(["/projets/monprojet"]);
    }, 10000);
  }

}
