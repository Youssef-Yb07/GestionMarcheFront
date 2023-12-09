import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { ProjetModule } from './Components/projet/projet.module';
import { AuthenticationComponent } from './Components/authentication/authentication.component';
import { ProfileModule } from './Components/profile/profile.module';
import {FormsModule} from "@angular/forms";
import { SideBarsModule } from './Components/side-bars/side-bars.module';
import { MarchetModule } from './Components/marchet/marchet.module';
import { TacheModule } from './Components/tache/tache.module';
@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ProjetModule,
        NgbPagination,
        ProfileModule,
        FormsModule,
        SideBarsModule,
        MarchetModule,
        TacheModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
