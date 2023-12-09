import {Component, OnInit} from '@angular/core';
import {TacheService} from "../../../Services/Tache/tache.service";
import {Tache} from "../../../Classes/tache";

@Component({
  selector: 'app-mes-taches',
  templateUrl: './mes-taches.component.html',
  styleUrls: ['./mes-taches.component.scss']
})
export class MesTachesComponent implements OnInit{

  idProject!:number;
  idEmployee!:number;
  taches:Tache[]=[];
  tache!:Tache;
  constructor(private tacheService:TacheService) {}
  ngOnInit() {
    this.idProject=Number(sessionStorage.getItem("idProject"));
    this.idEmployee=Number(sessionStorage.getItem("idUser"));
    this.getTaches();
  }

  getTaches(){
    this.tacheService.getTasksFromProjectByEmployee(this.idProject,this.idEmployee).subscribe(
      (response)=>{
        console.log(response);
        this.taches=response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  updateTaskStatus(idTache: number, status: string) {
    this.tacheService.updateState(idTache, status).subscribe(
      (data) => {
        this.tache = data;
        this.getTaches();
      },
      (error) => {
        console.log(error);
      }
    );
  }



}
