import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListProjectsComponent} from "./list-projects/list-projects.component";

const routes: Routes = [
  {path:"get/all", component:ListProjectsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule {}
