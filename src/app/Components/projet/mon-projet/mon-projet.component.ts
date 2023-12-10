import {Component, OnInit} from '@angular/core';
import {User} from "../../../Classes/user";
import {ProjectService} from "../../../Services/Project/project.service";
import {Project} from "../../../Classes/project";
import {TacheService} from "../../../Services/Tache/tache.service";
import {Tache} from "../../../Classes/tache";


@Component({
  selector: 'app-mon-projet',
  templateUrl: './mon-projet.component.html',
  styleUrls: ['./mon-projet.component.scss']
})
export class MonProjetComponent implements OnInit{

  projet!:Project;
  tache!:Tache;
  idUser:number;
  role:string|null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private projetService: ProjectService,private tacheService:TacheService) {}

  ngOnInit(): void {
    this.idUser= Number(sessionStorage.getItem('idUser'));
    console.log(this.idUser);
    this.role = sessionStorage.getItem('role');
    this.getProjectByUser();
  }

  getProjectByUser() {
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

  UpdateBudget(){
    this.projetService.updateBudget(this.idUser,this.projet.idProject,this.projet.budget).subscribe(
      (data) => {
        this.projet = data;
        this.successMessage = 'Budget updated successfully';
        this.getProjectByUser();
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Failed to update budget';
      }
    );
  }

  UpdateStatut(currentStatus: string){
    const newStatus = currentStatus === 'accepte' ? 'invalide' : 'accepte';
    this.projetService.updateStatut(this.projet.idProject,newStatus).subscribe(
      (data) => {
        this.projet = data;
        this.successMessage = 'Statut updated successfully';
        this.getProjectByUser();

      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Failed to update statut';
      }
    );
  }

  deleteEmployeeFromProject(idProject: number,idUser: number) {
    this.projetService.deleteEmployeFromProject(idProject, idUser).subscribe(
      (data) => {
        this.projet = data;
        this.successMessage = 'Employee deleted from project successfully';
        this.getProjectByUser();
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Failed to delete employee from project';
      }
    );
  }
  UpdateStatutTache(idTache: number,status:string){
    this.tacheService.updateState(idTache,status).subscribe(
      (data) => {
        this.tache = data;
        this.successMessage = 'Statut updated successfully';
        this.getProjectByUser();
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Failed to update statut';
      }
    );
  }

}
