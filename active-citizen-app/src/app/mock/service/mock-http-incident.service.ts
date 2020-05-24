import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as incident from '../data/incidents.data.json'
import { Urls } from 'src/app/core/http/model/url/urls.model';

const INCIDENTS = Urls.BaseUrl+ '/incidents';

@Injectable()
export class MockHttpIncidentService {

  constructor(){}

  get(url: string): Observable<any> {
    switch (url) {
      case INCIDENTS:
        return of(incident.data);
      default:
        const id = url.substring(url.lastIndexOf('/') + 1);
        return of(incident.data[id]);
    }
  }
}
