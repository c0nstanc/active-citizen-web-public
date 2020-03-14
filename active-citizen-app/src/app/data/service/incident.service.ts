import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  ) { }

  getAll(): Observable<Array<Incident>> {
    return this.jsonApiService.get('/incidents').pipe(map((incidents: Incident[]) => {
      incidents.push(...this.incidents);
      return incidents;
    }));
  }

  getSingle(id: number): Observable<Incident> {
    return this.jsonApiService.get('/incidents/' + id); // Todo update me
  }

  addNewIncident(incident: Incident): void {
    this.incidents.push(incident);
  }
}
