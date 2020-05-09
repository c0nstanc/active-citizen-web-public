import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IncidentService } from '../../data/service/incident.service';
import { Incident } from 'src/app/data/schema/incident.model';

const ID = 'id';

@Injectable({
  providedIn: 'root'
})
export class IncidentResolver implements Resolve<Incident> {
  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.incidentService.getSingle(route.params[ID])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
