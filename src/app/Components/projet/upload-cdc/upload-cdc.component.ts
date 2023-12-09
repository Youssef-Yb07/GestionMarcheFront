import {Component, OnInit} from '@angular/core';
import {Project} from "../../../Classes/project";
import {ProjectService} from "../../../Services/Project/project.service";
import {Tache} from "../../../Classes/tache";
import {TacheService} from "../../../Services/Tache/tache.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload-cdc',
  templateUrl: './upload-cdc.component.html',
  styleUrls: ['./upload-cdc.component.scss']
})
export class UploadCDCComponent implements OnInit{

  projet!:Project;
  selectedFile!: File;
  tache!:Tache;
  idUser:number;
  role:string|null;
  selectedProject:number;
  successMessage:string;
  errorMessage:string;

  ngOnInit(): void {
    this.idUser= Number(sessionStorage.getItem('idUser'));
    console.log(this.idUser);
    this.role = sessionStorage.getItem('role');
    this.selectedProject = Number(sessionStorage.getItem('idProject'));
    this.getProjectByUser();
  }

  getProjectByUser(){
    this.projetService.getProjectsByDirecteurOrChiefService(this.idUser).subscribe(
      (data) => {
        this.projet = data;
        console.log(this.projet);
        if (this.projet) {
          sessionStorage.setItem('idProject', String(this.projet.idProject));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  constructor(private projetService:ProjectService,private router:Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(){
    this.projetService.uploadCdc(this.selectedProject,this.selectedFile).subscribe(
      (data)=>{
        console.log(data);
        this.successMessage = "Le cahier des charges a été ajouté avec succès";
      },
      (err)=>{
        console.log(err);
        this.errorMessage = "Erreur lors de l'ajout du cahier des charges";
      }
    );
  }

}
