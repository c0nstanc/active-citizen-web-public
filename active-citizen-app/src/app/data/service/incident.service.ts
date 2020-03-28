import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { JsonApiService } from './json-api.service';
import { Incident } from '../schema/incident.model';

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
    this.incidents.push(incident);
  }
}
