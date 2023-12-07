import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import { ProjetRoutingModule } from './projet-routing.module';
import { CreateProjetComponent } from './create-projet/create-projet.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { UploadCDCComponent } from './upload-cdc/upload-cdc.component';
import { AssignTasksComponent } from './assign-tasks/assign-tasks.component';
import { AssignUsersComponent } from './assign-users/assign-users.component';


@NgModule({
  declarations: [
    CreateProjetComponent,
    ListProjectsComponent,
    UploadCDCComponent,
    AssignTasksComponent,
    AssignUsersComponent
  ],
  imports: [
    CommonModule,
    ProjetRoutingModule,
    FormsModule,
    NgbPagination
  ]
})
export class ProjetModule { }
