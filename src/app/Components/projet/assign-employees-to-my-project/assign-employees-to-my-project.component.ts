import { Component, OnInit } from '@angular/core';
import { Project } from "../../../Classes/project";
import { User } from "../../../Classes/user";
import { UserService } from "../../../Services/User/user.service";
import { ProjectService } from "../../../Services/Project/project.service";

@Component({
  selector: 'app-assign-employees-to-my-project',
  templateUrl: './assign-employees-to-my-project.component.html',
  styleUrls: ['./assign-employees-to-my-project.component.scss']
})
export class AssignEmployeesToMyProjectComponent implements OnInit {

  employees: User[] = [];
  idProject!: number;
  successMessage: string;
  errorMessage: string;
  role: string|null;

  constructor(private userService: UserService, private projetService: ProjectService) { }

  async ngOnInit(): Promise<void> {
    this.idProject = await this.getIdProjectFromSessionStorage();
    console.log("Test ============>", this.idProject);
    this.getEmployeesNotMembersInProject();
    this.role = sessionStorage.getItem("role");
  }

  getIdProjectFromSessionStorage(): Promise<number> {
    return new Promise(resolve => {
      const idProject = sessionStorage.getItem("idProject");
      if (idProject) {
        resolve(Number(idProject));
      } else {
        // You might want to handle this case differently, depending on your requirements.
        console.error("idProject not found in sessionStorage");
        resolve(-1); // Resolve with a default value or an error indicator.
      }
    });
  }

  getEmployeesNotMembersInProject() {
    this.userService.getAllEmployeesNotMemberInProject(this.idProject).subscribe(
      (data) => {
        console.log(data);
        this.employees = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  assignUsersToProject(userId: number) {
    const usersToAssign: number[] = [userId];

    this.projetService.assignUsersToProject(this.idProject, usersToAssign).subscribe(
      (data) => {
        console.log(data);
        this.showSuccessMessage();
        this.getEmployeesNotMembersInProject();
      },
      (error) => {
        console.log(error);
        this.showErrorMessage();
      }
    );
  }

  showSuccessMessage() {
    this.successMessage = 'Employee assigned successfully';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  showErrorMessage() {
    this.errorMessage = 'An error occurred while assigning employee to project';
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

}
