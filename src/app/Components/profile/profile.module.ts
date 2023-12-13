import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { DirecteurComponent } from './directeur/directeur.component';
import { ChefServiceComponent } from './chef-service/chef-service.component';
import { EmployeComponent } from './employe/employe.component';
import {SideBarsModule} from "../side-bars/side-bars.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [

    DirecteurComponent,
       ChefServiceComponent,
       EmployeComponent
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SideBarsModule,
        FormsModule
    ]
})
export class ProfileModule { }
