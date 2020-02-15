import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JsonApiService } from './json-api.service';
import { Incident } from '../schema/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  constructor(
    private jsonApiService: JsonApiService
  ) { }

  getAll(): Observable<Array<Incident>> {
    return this.jsonApiService.get('/incidents');
  }

  getSingle(id: number): Observable<Incident> {
    return this.jsonApiService.get('/incidents/' + id);
  }
}
