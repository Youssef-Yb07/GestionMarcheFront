import {Component, OnInit} from '@angular/core';
import {Project} from "../../../Classes/project";
import {ProjectService} from "../../../Services/Project/project.service";

@Component({
  selector: 'app-directeur',
  templateUrl: './directeur.component.html',
  styleUrls: ['./directeur.component.css']
})
export class DirecteurComponent implements OnInit{

  idUser:number;
  projet!:Project;

  ngOnInit() {
    this.idUser= Number(sessionStorage.getItem('idUser'));
    this.getProjectByUser();
  }

  constructor(private projetService:ProjectService) {}
  getProjectByUser(){
    this.projetService.getProjectsByDirecteurOrChiefService(this.idUser).subscribe(
      (data) => {
        this.projet = data;
        console.log(this.projet);
        if (this.projet) {
          sessionStorage.setItem('idProject', String(this.projet.idProject));
          console.log(sessionStorage.getItem('idProject'));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
