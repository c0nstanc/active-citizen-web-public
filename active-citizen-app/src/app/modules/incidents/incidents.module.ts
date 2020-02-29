import { NgModule } from '@angular/core';

import { MyModalComponent } from './modal/my-modal.component';

import { MyIncidentsComponent } from './pages/my-incidents/my-incidents.component';
import { IncidentsRoutingModule } from './incidents.routing';

import { IncidentItemComponent } from './pages/components/incident-item/incident-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewIncidentComponent } from './pages/new-incident/new-incident.component';
import { GoogleMapComponent } from './pages/components/google-map/google-map.component';
import { IncidentWizardContainerComponent } from './pages/new-incident/component/incident-wizard-container/incident-wizard-container';

@NgModule({
  declarations: [
    MyIncidentsComponent,
    MyModalComponent,
    IncidentItemComponent,
    NewIncidentComponent,
    IncidentWizardContainerComponent,
    GoogleMapComponent
  ],
  imports: [
    SharedModule,

    IncidentsRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: [MyModalComponent]
})
export class IncidentsModule { }
