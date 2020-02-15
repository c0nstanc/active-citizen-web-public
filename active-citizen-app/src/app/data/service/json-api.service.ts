import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as data from './json/data.json';

@Injectable({
  providedIn: 'root'
})
export class JsonApiService {

  get(url: string): Observable<any> {
    switch (url) {
      case '/incidents':
        return of(data.incidents);
      default:
        const id = url.substring(url.lastIndexOf('/') + 1);
        return of(data.incidents[id]);
    }
  }
}
