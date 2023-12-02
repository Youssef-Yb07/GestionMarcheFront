import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideBarsRoutingModule } from './side-bars-routing.module';
import { SideBarAdminComponent } from './side-bar-admin/side-bar-admin.component';


@NgModule({
    declarations: [
        SideBarAdminComponent
    ],
    exports: [
        SideBarAdminComponent
    ],
    imports: [
        CommonModule,
        SideBarsRoutingModule
    ]
})
export class SideBarsModule { }
