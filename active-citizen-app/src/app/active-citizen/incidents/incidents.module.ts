import { NgModule } from '@angular/core';

import { MyIncidentsComponent } from './component/my-incidents/my-incidents.component';
import { IncidentsRoute } from './incidents.routing';

import { SharedModule } from 'src/app/shared/shared.module';
import { NewIncidentComponent } from './component/new-incident/new-incident.component';
import { IncidentDetailsComponent } from './component/incident-details/incident-details.component';
import { IncidentItemComponent } from './component/incident-item/incident-item.component';
import { NewIncidentWizardStepperComponent } from './component/new-incident-wizard-stepper/new-incident-wizard-stepper.component';
import { IncidentMapsModule } from '../shared/incident-maps/incident-maps.module';

@NgModule({
  declarations: [
    IncidentDetailsComponent,
    MyIncidentsComponent,
    IncidentItemComponent,
    NewIncidentComponent,
    NewIncidentWizardStepperComponent
  ],
  imports: [
    SharedModule,
    IncidentsRoute,
    IncidentMapsModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class IncidentsModule { }
