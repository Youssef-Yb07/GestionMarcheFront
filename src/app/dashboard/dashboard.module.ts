import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SideBarsModule} from "../side-bars/side-bars.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SideBarsModule
    ]
})
export class DashboardModule { }
