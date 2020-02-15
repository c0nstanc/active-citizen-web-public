import { NgModule } from '@angular/core';

import { MyModalComponent } from './modal/my-modal.component';

import { HomeComponent } from './page/home.component';
import { HomeRoutingModule } from './home.routing';

import { IncidentItemComponent } from './page/incident-item/incident-item.component';
import { IncidentDetailsComponent } from './page/incident-details/incident-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        HomeComponent,
        MyModalComponent,
        IncidentItemComponent,
        IncidentDetailsComponent
    ],
    imports: [
        SharedModule,

        HomeRoutingModule
    ],
    exports: [],
    providers: [],
    entryComponents: [MyModalComponent]
})
export class HomeModule {}
