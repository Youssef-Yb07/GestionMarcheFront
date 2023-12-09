import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarDirecteurComponent } from './side-bar-directeur/side-bar-directeur.component';
import { SideBarChefServiceComponent } from './side-bar-chef-service/side-bar-chef-service.component';
import { SideBarEmployeComponent } from './side-bar-employe/side-bar-employe.component';
import {RouterLink} from "@angular/router";



@NgModule({
    declarations: [
        SideBarDirecteurComponent,
        SideBarChefServiceComponent,
        SideBarEmployeComponent
    ],
  exports: [
    SideBarDirecteurComponent,
    SideBarChefServiceComponent,
    SideBarEmployeComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class SideBarsModule { }
