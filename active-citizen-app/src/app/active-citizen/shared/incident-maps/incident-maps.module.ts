import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentMapComponent } from './component/incident-map/incident-map.component';
import { IncidentsMapComponent } from './component/incidents-map/incidents-map.component';
import { MyLocationMapComponent } from './component/my-location-map/my-location-map.component';



@NgModule({
  declarations: [
    IncidentMapComponent,
    IncidentsMapComponent,
    MyLocationMapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IncidentMapComponent,
    IncidentsMapComponent,
    MyLocationMapComponent
  ]
})
export class IncidentMapsModule { }
