import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateProjetComponent} from "./create-projet/create-projet.component";
import {ListProjectsComponent} from "./list-projects/list-projects.component";
import {UploadCDCComponent} from "./upload-cdc/upload-cdc.component";
import {AssignTasksComponent} from "./assign-tasks/assign-tasks.component";
import {AssignUsersComponent} from "./assign-users/assign-users.component";
import {MonProjetComponent} from "./mon-projet/mon-projet.component";
import {AssignEmployeesToTaskComponent} from "../tache/assign-employees-to-task/assign-employees-to-task.component";
import {
  AssignEmployeesToMyProjectComponent
} from "./assign-employees-to-my-project/assign-employees-to-my-project.component";
import {MesProjetsComponent} from "./mes-projets/mes-projets.component";

const routes: Routes = [
  {path:'create',component:CreateProjetComponent},
  {path:"get/all", component:ListProjectsComponent},
  {path:"all", component:MesProjetsComponent},
  {path:'upload/cdc',component:UploadCDCComponent},
  {path:'assign/tasks' ,component:AssignTasksComponent},
  {path:'assign/users' ,component:AssignUsersComponent},
  {path:'assign/employees' ,component:AssignEmployeesToMyProjectComponent},
  {path:'',redirectTo:'create',pathMatch:'full'},
  {path:'monprojet',component:MonProjetComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule {}
