import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../Services/User/user.service";
import {ProjectService} from "../../../Services/Project/project.service";
import {User} from "../../../Classes/user";
import {Project} from "../../../Classes/project";

@Component({
  selector: 'app-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.scss']
})
export class AssignUsersComponent implements OnInit {

  selectedDirecteur: number;
  selectedChefService: number;
  selectedEmployees: number[] = [];
  selectedProject: number;

  Directeurs: User[] = [];
  ChefsServices: User[] = [];
  Projects: Project[] = [];
  employees: User[] = [];

  constructor(private userService: UserService, private projetService: ProjectService) {}

  ngOnInit(): void {
    this.getDirectorsNotAffected();
    this.getChiefServiceNotAffected();
    this.getAllProjects();
    this.getAllEmployees();
  }

  getDirectorsNotAffected() {
    this.userService.getAllDirectorsNotAffected().subscribe(
      (data) => {
        console.log(data);
        this.Directeurs = data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  getChiefServiceNotAffected() {
    this.userService.getAllChiefServiceNotAffected().subscribe(
      (data) => {
        console.log(data);
        this.ChefsServices = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllProjects() {
    this.projetService.getAllProjects().subscribe(
      (data) => {
        console.log(data);
        this.Projects = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllEmployees() {
    this.userService.getAllEmployees().subscribe(
      (data) => {
        console.log(data);
        this.employees = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  assignUsersToProject() {
    const usersToAssign: number[] = [];
    if (this.selectedDirecteur) {
      usersToAssign.push(this.selectedDirecteur);
    }
    if (this.selectedChefService) {
      usersToAssign.push(this.selectedChefService);
    }
    usersToAssign.push(...this.selectedEmployees);

    this.projetService.assignUsersToProject(this.selectedProject, usersToAssign).subscribe(
      (data) => {
        console.log(data);
        alert('Users assigned successfully');
      },
      (error) => {
        console.log(error);
        alert('Error while assigning users');
      }
    );
  }

  toggleSelection(employeeId: number) {
    const index = this.selectedEmployees.indexOf(employeeId);

    if (index === -1) {
      this.selectedEmployees.push(employeeId);
    } else {
      this.selectedEmployees.splice(index, 1);
    }
  }
}
