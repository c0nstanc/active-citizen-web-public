import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { IncidentService } from 'src/app/data/service/incident.service';
import { Incident } from 'src/app/data/schema/incident.model';
import { Router } from '@angular/router';
import { IncidentMarker } from 'src/app/shared/component/incidents-map/model/incident-marker.model';
import { LatLng } from 'src/app/shared/component/my-location-map/model/lat-lng.model';

@Component({
  selector: 'app-home',
  templateUrl: './my-incidents.component.html',
  styleUrls: ['./my-incidents.component.scss']
})
export class MyIncidentsComponent implements OnInit {

  incidents$: Observable<Incident[]>;

  incidentMarkers: IncidentMarker[];

  constructor(
    private router: Router,
    private incidentService: IncidentService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
    this.incidentMarkers = [
      new IncidentMarker(
        new LatLng(
          35.185475,
          33.382757),
          'my 1',
          'red'),
          new IncidentMarker(
            new LatLng(
              35.185475,
              33.389757),
              'my 2',
              'red'),
              new IncidentMarker(
                new LatLng(
                  35.185345,
                  33.383345),
                  'my 3',
                  'red'),
                  new IncidentMarker(
                    new LatLng(
                      35.183245,
                      33.383757),
                      'my 4',
                      'red'),
                      new IncidentMarker(
                        new LatLng(
                          35.184536,
                          33.383757),
                          'my 5',
                          'red'),
    ];
  }

  createIncident(): void {
    this.router.navigate(['incidents/new-incident']);
  }

  private loadProjects(): void {
    this.incidents$ = this.incidentService.getAll();
  }
}
