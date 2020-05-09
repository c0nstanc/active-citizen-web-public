import { NgModule } from '@angular/core';

import { MyIncidentsComponent } from './page/my-incidents/my-incidents.component';
import { IncidentsRoute } from './incidents.routing';

import { SharedModule } from 'src/app/shared/shared.module';
import { NewIncidentComponent } from './page/new-incident/new-incident.component';
import { IncidentDetailsComponent } from './page/incident-details/incident-details.component';
import { IncidentItemComponent } from './page/my-incidents/component/incident-item/incident-item.component';
import { NewIncidentWizardStepperComponent } from './page/new-incident/component/new-incident-wizard-stepper/new-incident-wizard-stepper.component';

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
    IncidentsRoute
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class IncidentsModule { }
