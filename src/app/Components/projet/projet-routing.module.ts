import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateProjetComponent} from "./create-projet/create-projet.component";
import {ListProjectsComponent} from "./list-projects/list-projects.component";
import {UploadCDCComponent} from "./upload-cdc/upload-cdc.component";
import {AssignTasksComponent} from "./assign-tasks/assign-tasks.component";
import {AssignUsersComponent} from "./assign-users/assign-users.component";

const routes: Routes = [
  {path:'create',component:CreateProjetComponent},
  {path:"get/all", component:ListProjectsComponent},
  {path:'upload/cdc',component:UploadCDCComponent},
  {path:'assign/tasks' ,component:AssignTasksComponent},
  {path:'assign/users' ,component:AssignUsersComponent},
  {path:'',redirectTo:'create',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule {}
