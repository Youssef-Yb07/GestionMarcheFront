import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../Services/Project/project.service";
import {TacheService} from "../../../Services/Tache/tache.service";
import {Project} from "../../../Classes/project";
import {Tache} from "../../../Classes/tache";

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.scss']
})
export class AssignTasksComponent implements OnInit{

  SelectedProject:number;
  SelectedTasks:number[];
  projects:Project[];
  tasks:Tache[];
  constructor(private projetService:ProjectService,private tacheService:TacheService) {}

  ngOnInit(): void {
    this.getTasks();
    this.getProjects();
  }

  getTasks(){
    this.tacheService.getAllTaches().subscribe(
      (data)=>{
      console.log(data);
      this.tasks=data;
    },
      (error)=>{
        console.log(error);
      }
    );
  }

  getProjects(){
    this.projetService.getAllProjects().subscribe(
      (data)=>{
        console.log(data);
        this.projects=data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  AssignTasksToProject(){
    this.projetService.assignTasksToProject(this.SelectedProject,this.SelectedTasks).subscribe(
      (data)=>{
        console.log(data);
        alert("Taches assignées avec succès");
      },
      (error)=>{
        console.log(error);
        alert("Erreur lors de l'assignation des taches");
      }
    );
  }
}
