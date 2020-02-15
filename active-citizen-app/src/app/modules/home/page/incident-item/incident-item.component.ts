import { Component, Input } from '@angular/core';
import {Incident} from '../../../../data/schema/incident.model';

@Component({
  selector: 'app-incident-item',
  templateUrl: './incident-item.component.html',
  styleUrls: ['./incident-item.component.scss']
})
export class IncidentItemComponent {
  @Input() incident: Incident;
  flipped = false;

  constructor() {
  }
}
