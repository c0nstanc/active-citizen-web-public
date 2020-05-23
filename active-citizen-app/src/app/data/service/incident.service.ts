import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { JsonApiService } from './json-api.service';
import { Incident } from '../schema/incident.model';
import { Event } from 'src/app/active-citizen/incidents/model/event.enum';
import { TimelineEvent } from 'src/app/core/common/model/timeline/timeline-event.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private incidents: Incident[] = [];

  constructor(
    private jsonApiService: JsonApiService
  ) {
    this.jsonApiService.get('/incidents').subscribe((incidents: Incident[]) => {
      this.incidents.push(...incidents);
    });
  }

  getAll(): Observable<Array<Incident>> {
    return of(this.incidents);
  }

  getSingle(id: string): Observable<Incident> {
    return of(this.incidents.find(incident => incident.id === id));
  }

  addNewIncident(incident: Incident): void {
    incident.id = (this.incidents.length + 1).toString();
    incident.timelineEvents.push(new TimelineEvent(incident.created, Event.SUBMITTED, ['Submittted by the System']));
    this.incidents.push(incident);
  }
}
