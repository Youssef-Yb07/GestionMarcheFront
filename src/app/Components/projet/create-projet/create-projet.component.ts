import { Component } from '@angular/core';
import {ProjectDTO} from "../../../Classes/project-dto";
import {ProjectService} from "../../../Services/Project/project.service";

@Component({
  selector: 'app-create-projet',
  templateUrl: './create-projet.component.html',
  styleUrls: ['./create-projet.component.css']
})
export class CreateProjetComponent {

  projet:ProjectDTO=new ProjectDTO();

  constructor(private projetService:ProjectService) {}

  createProjet() {
    this.projetService.createProjet(this.projet).subscribe(
      (data:ProjectDTO) => {
        console.log(data);
        console.log("Projet créé avec succès =============>",this.projet);
        console.log("Nom =============>",this.projet.nom);
        alert("Projet créé avec succès");
      },
      (error:ProjectDTO) => {
        console.log(error);
        console.log("Nom =============>",this.projet.nom);
        console.log("Erreur lors de la création du projet =============>",this.projet);
      }
    )
  }

}
