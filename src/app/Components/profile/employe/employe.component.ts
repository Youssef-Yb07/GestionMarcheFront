import { Component } from '@angular/core';
import {ProjectService} from "../../../Services/Project/project.service";
import {Project} from "../../../Classes/project";

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent {

  idEmployee:number;
  projets:Project[]=[];
  constructor(private projetservice:ProjectService) { }

  ngOnInit(): void {
    this.idEmployee=Number(sessionStorage.getItem('idUser'));
    this.getAllProjectsByEmployee();
  }

  getAllProjectsByEmployee(){
    this.projetservice.getAllProjectsByEmployee(this.idEmployee).subscribe((data) => {
      console.log("Mes Projets ==>",data);
      this.projets=data;
    },
      (error)=>{
        console.log(error);
      }
      );
  }
}
