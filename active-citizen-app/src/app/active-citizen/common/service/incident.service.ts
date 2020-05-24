import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Event } from 'src/app/active-citizen/incidents/model/event.enum';
import { TimelineEvent } from 'src/app/active-citizen/common/model/timeline/timeline-event.model';
import { Incident } from '../model/incident/incident.model';
import { HttpIncidentService } from 'src/app/core/http/service/http-incident.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private incidents: Incident[] = [];

  constructor(
    private httpIncidentService: HttpIncidentService
  ) {
    this.httpIncidentService.getIncidents().subscribe((incidents: Incident[]) => {
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
