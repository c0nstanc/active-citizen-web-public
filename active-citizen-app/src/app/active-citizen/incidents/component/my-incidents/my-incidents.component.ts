import { Component, OnInit, ViewChild } from '@angular/core';
import { Incident } from 'src/app/active-citizen/common/model/incident/incident.model';
import { Router } from '@angular/router';
import { IncidentMarker } from 'src/app/active-citizen/common/model/incident/incident-marker.model';
import { IncidentsMapComponent } from 'src/app/active-citizen/common/module/incident-maps/component/incidents-map/incidents-map.component';
import { IncidentService } from 'src/app/active-citizen/common/service/incident.service';

@Component({
  selector: 'ac-my-incidents',
  templateUrl: './my-incidents.component.html',
  styleUrls: ['./my-incidents.component.scss']
})
export class MyIncidentsComponent implements OnInit {

  incidents: Incident[];

  incidentMarkers: IncidentMarker[];


  @ViewChild('incidentsMap')
  incidentsMap: IncidentsMapComponent;

  constructor(
    private router: Router,
    private incidentService: IncidentService
  ) { }

  ngOnInit(): void {
    this.incidentMarkers = [];
    this.loadProjects();
  }

  createIncident(): void {
    this.router.navigate(['incidents/new']);
  }

  onIncidentClicked(incident: Incident): void {
    this.navigateToIncident(incident);
  }

  onIncidentMouseEnter(incident: Incident): void {
    this.incidentsMap.startBounceMarker(incident.locationDetails.latLng);
  }

  onIncidentMouseLeave(incident: Incident): void {
    this.incidentsMap.stopBounceMarker(incident.locationDetails.latLng);
  }

  private navigateToIncident(incident: Incident): void {
    this.router.navigate(['incidents/' + incident.id]);
  }

  private loadProjects(): void {
    this.incidentService.getAll().subscribe((incidents: Incident[]) => {
      this.incidents = incidents;

      incidents.forEach(incident => {
        this.incidentMarkers.push(new IncidentMarker(
          incident.locationDetails.latLng,
          incident.id,
          'red'));
      });
    });
  }
}
