import { Component } from '@angular/core';
import { Incident } from 'src/app/data/schema/incident.model';

@Component({
  selector: 'app-new-incident-item',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.scss']
})
export class NewIncidentComponent {
  incident: Incident;


}
