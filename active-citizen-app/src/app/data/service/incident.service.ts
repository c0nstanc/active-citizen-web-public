import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { JsonApiService } from './json-api.service';
import { Incident } from '../schema/incident.model';
import { map } from 'rxjs/operators';

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

  getSingle(id: number): Observable<Incident> {
    return this.jsonApiService.get('/incidents/' + id); // Todo update me
  }

  addNewIncident(incident: Incident): void {
    incident.id = (this.incidents.length + 1).toString();
    this.incidents.push(incident);
  }
}
