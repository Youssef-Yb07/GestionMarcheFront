import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateTaskComponent} from "./create-task/create-task.component";
import {AssignTasksToProjectComponent} from "./assign-tasks-to-project/assign-tasks-to-project.component";
import {AssignEmployeesToTaskComponent} from "./assign-employees-to-task/assign-employees-to-task.component";
import {MesTachesComponent} from "./mes-taches/mes-taches.component";

const routes: Routes = [
  { path: 'create',component:CreateTaskComponent},
  { path: 'assign/to/my/project',component:AssignTasksToProjectComponent},
  { path: 'assign/employee',component:AssignEmployeesToTaskComponent},
  { path: 'mes/taches',component:MesTachesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TacheRoutingModule { }
