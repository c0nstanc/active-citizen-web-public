import { NgModule } from '@angular/core';

import { MyIncidentsComponent } from './pages/my-incidents/my-incidents.component';
import { IncidentsRoutingModule } from './incidents.routing';

import { IncidentItemComponent } from './pages/components/incident-item/incident-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewIncidentComponent } from './pages/new-incident/new-incident.component';
import { IncidentWizardModule } from '../incident-wizard/incident-wizard.module';

@NgModule({
  declarations: [
    MyIncidentsComponent,
    IncidentItemComponent,
    NewIncidentComponent,
  ],
  imports: [
    SharedModule,
    IncidentWizardModule,
    IncidentsRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class IncidentsModule { }
