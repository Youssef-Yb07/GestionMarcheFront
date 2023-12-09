import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarchetRoutingModule } from './marchet-routing.module';
import { ListMarchetsComponent } from './list-marchets/list-marchets.component';
import {SideBarsModule} from "../side-bars/side-bars.module";


@NgModule({
  declarations: [
    ListMarchetsComponent
  ],
    imports: [
        CommonModule,
        MarchetRoutingModule,
        SideBarsModule
    ]
})
export class MarchetModule { }
