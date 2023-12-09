import {Component, OnInit} from '@angular/core';
import {Tache} from "../../../Classes/tache";
import {TacheService} from "../../../Services/Tache/tache.service";
import {Router} from "@angular/router";
import {UserService} from "../../../Services/User/user.service";
import {User} from "../../../Classes/user";

@Component({
  selector: 'app-assign-employees-to-task',
  templateUrl: './assign-employees-to-task.component.html',
  styleUrls: ['./assign-employees-to-task.component.scss']
})
export class AssignEmployeesToTaskComponent implements OnInit{

  taches:Tache[]=[];
  employees:User[]= [];
  idProject!:number;
  successMessage:string;
  errorMessage:string;
  selectedEmployee: number;


  constructor(private tacheService:TacheService,private employeeService:UserService,private router:Router) {}

  ngOnInit(): void {
    this.idProject=Number(sessionStorage.getItem("idProject"));
    this.getTasks();
    this.getAllEmployeesByProject();
  }

  getAllEmployeesByProject(){
    this.employeeService.getAllEmployeesByProject(this.idProject).subscribe(
      (response)=>{
        console.log(response);
        this.employees=response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  getTasks(){
    this.tacheService.getTasksNotAffectedToEmployee().subscribe(
      (response)=>{
        console.log(response);
        this.taches=response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  assignUsersToProject(idTask:number) {

    this.tacheService.assignTaskToEmployee(idTask,this.selectedEmployee).subscribe(
      (data) => {
        console.log(data);
        this.successMessage="Tache Assignée avec Succés";
        this.redirectAfterDelay();
      },
      (error) => {
        console.log(error);
        this.errorMessage="Erreur lors de l'affectation"
      }
    );
  }

  redirectAfterDelay() {
    setTimeout(() => {
      this.getTasks();
    }, 5000);
  }


}
