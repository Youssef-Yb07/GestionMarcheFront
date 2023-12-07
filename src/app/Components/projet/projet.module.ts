import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

import { ProjetRoutingModule } from './projet-routing.module';
import { ListProjectsComponent } from './list-projects/list-projects.component';


@NgModule({
  declarations: [
    ListProjectsComponent
  ],
  imports: [
    CommonModule,
    ProjetRoutingModule,
    NgbPagination,
    FormsModule
  ]
})
export class ProjetModule { }
