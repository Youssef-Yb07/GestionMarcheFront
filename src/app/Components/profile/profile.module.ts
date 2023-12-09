import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { DirecteurComponent } from './directeur/directeur.component';
import { ChefServiceComponent } from './chef-service/chef-service.component';
import { EmployeComponent } from './employe/employe.component';


@NgModule({
  declarations: [
  
    DirecteurComponent,
       ChefServiceComponent,
       EmployeComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
