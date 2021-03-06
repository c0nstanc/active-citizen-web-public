import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Incident } from 'src/app/active-citizen/common/model/incident/incident.model';
import { IncidentService } from '../common/service/incident.service';

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
      .pipe(map((incident: Incident) => this.redirectIfNotExist(incident)));
  }

  private redirectIfNotExist(incident: Incident): Incident | void {
    if (!incident) {
      this.router.navigateByUrl('/');
    }
    return incident;
  }
}
