import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/data/service/incident.service';
import { Incident } from 'src/app/data/schema/incident.model';
import { Router } from '@angular/router';
import { IncidentMarker } from 'src/app/shared/component/map/incidents-map/model/incident-marker.model';

@Component({
  selector: 'app-home',
  templateUrl: './my-incidents.component.html',
  styleUrls: ['./my-incidents.component.scss']
})
export class MyIncidentsComponent implements OnInit {

  incidents: Incident[];

  incidentMarkers: IncidentMarker[];

  constructor(
    private router: Router,
    private incidentService: IncidentService
  ) { }

  ngOnInit(): void {
    this.incidentMarkers = [];
    this.loadProjects();
  }

  createIncident(): void {
    this.router.navigate(['incidents/new-incident']);
  }

  onIncidentClicked(incident: Incident): void {
    this.navigateToIncident(incident);
  }

  private navigateToIncident(incident: Incident) {
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
