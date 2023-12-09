import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DirecteurComponent} from "./directeur/directeur.component";
import {ChefServiceComponent} from "./chef-service/chef-service.component";
import {EmployeComponent} from "./employe/employe.component";

const routes: Routes = [
  {path:'Directeur',component:DirecteurComponent},
  {path:'ChefService',component:ChefServiceComponent},
  {path:'Employe',component:EmployeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
