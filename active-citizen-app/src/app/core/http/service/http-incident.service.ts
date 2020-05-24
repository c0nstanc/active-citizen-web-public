import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockHttpIncidentService } from 'src/app/mock/service/mock-http-incident.service';
import { Observable } from 'rxjs';
import { HttpIncident } from '../model/incident/http-incident.model';
import { Urls } from '../model/url/urls.model';

@Injectable({
  providedIn: 'root'
})
export class HttpIncidentService {

  constructor(
    private http: HttpClient,
    private mockHttpIncidentService: MockHttpIncidentService
  ) { }

  getIncidents(): Observable<HttpIncident[]>{
    return this.mockHttpIncidentService.get(Urls.Incidents);
  }
}
