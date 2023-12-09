import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListMarchetsComponent} from "./list-marchets/list-marchets.component";

const routes: Routes = [
  {path:'get/all',component:ListMarchetsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarchetRoutingModule { }
