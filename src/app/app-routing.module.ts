import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthenticationComponent} from "./Components/authentication/authentication.component";

const routes: Routes = [
  {path: 'login', component:AuthenticationComponent},
  {path:'',redirectTo:'/login',pathMatch:"full"},
  {path: 'projets', loadChildren: () => import('./Components/projet/projet.module').then(m => m.ProjetModule)},
  {path: 'profiles', loadChildren: () => import('./Components/profile/profile.module').then(m => m.ProfileModule)},
  {path: 'marches', loadChildren: () => import('./Components/marchet/marchet.module').then(m => m.MarchetModule)},
{path: 'taches', loadChildren: () => import('./Components/tache/tache.module').then(m => m.TacheModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
