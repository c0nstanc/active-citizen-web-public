import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Incident } from 'src/app/data/schema/incident.model';
import { IncidentMapComponent } from 'src/app/shared/component/map/incident-map/incident-map.component';
import { LatLng } from 'src/app/shared/component/map/my-location-map/model/lat-lng.model';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.scss']
})
export class IncidentDetailsComponent implements OnInit {
  incident: Incident = new Incident();
  incidentLocation: LatLng;



  @ViewChild('incidentMap', { static: true })
  incidentMap: IncidentMapComponent;

  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.incident = data.incident;
      this.incidentLocation = this.incident.locationDetails.latLng;
      console.log(this.incident.id);
      if (this.incidentMap) {
        this.incidentMap.intilalizeMap(this.incident.locationDetails.latLng);
      }
    });
  }
}
