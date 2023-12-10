import {Component, OnInit} from '@angular/core';
import {Tache} from "../../../Classes/tache";
import {TacheService} from "../../../Services/Tache/tache.service";
import {User} from "../../../Classes/user";
import {Router} from "@angular/router";
import {TaskDTO} from "../../../Classes/task-dto";
import {ProjectService} from "../../../Services/Project/project.service";
import {Project} from "../../../Classes/project";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit{

  tacheDTO:TaskDTO=new TaskDTO();
  idProject:number;
  project:Project=new Project();
  tache:Tache = new Tache();

  constructor(private tacheService:TacheService,private projetService:ProjectService,private router:Router) {}

  ngOnInit(): void {
    this.idProject=Number(sessionStorage.getItem('idProject'));
    this.getProjectByID();
    console.log("this.project" + this.project);
  }

  createTask() {
    this.tacheDTO.project = this.project;
    console.log("this.tacheDTO.project :::: " + this.tacheDTO.project.nom)
    this.tacheService.createTache(this.tacheDTO).subscribe(

      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getProjectByID(){
    this.projetService.getProjectById(this.idProject).subscribe(
      (data)=>{
        console.log(data);
        this.project=data;
        this.tacheDTO.project = this.project;
      },
      (error)=>{
        console.log(error);
      }
    );
  }
/*  assignTaskToProject(){
    this.tacheService.assignTaskToProject(this.idProject,this.tache.idTask).subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    );
  }*/

}
