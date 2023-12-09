import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TacheRoutingModule } from './tache-routing.module';
import { CreateTaskComponent } from './create-task/create-task.component';
import {FormsModule} from "@angular/forms";
import { AssignTasksToProjectComponent } from './assign-tasks-to-project/assign-tasks-to-project.component';
import { AssignEmployeesToTaskComponent } from './assign-employees-to-task/assign-employees-to-task.component';
import {SideBarsModule} from "../side-bars/side-bars.module";
import { MesTachesComponent } from './mes-taches/mes-taches.component';


@NgModule({
  declarations: [
    CreateTaskComponent,
    AssignTasksToProjectComponent,
    AssignEmployeesToTaskComponent,
    MesTachesComponent
  ],
  imports: [
    CommonModule,
    TacheRoutingModule,
    FormsModule,
    SideBarsModule
  ]
})
export class TacheModule { }
