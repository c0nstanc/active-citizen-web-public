import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Incident } from 'src/app/active-citizen/common/model/incident/incident.model';
import { IncidentMapComponent } from 'src/app/active-citizen/common/module/incident-maps/component/incident-map/incident-map.component';
import { ProgressItem } from 'src/app/active-citizen/common/model/progress/progress-item.model';
import { ImageSlide } from 'src/app/active-citizen/common/model/carousel/image-slide.model';
import { LatLng } from 'src/app/active-citizen/common/model/location/lat-lng.model';

@Component({
  selector: 'ac-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.scss']
})
export class IncidentDetailsComponent implements OnInit {
  incident: Incident = new Incident();
  incidentLocation: LatLng;

  imageSlides: ImageSlide[] = [];
  progressItems = [
    new ProgressItem('submitted'),
    new ProgressItem('confirmed'),
    new ProgressItem('progressing'),
    new ProgressItem('resolved'),
    new ProgressItem('closed'),
    new ProgressItem('archived')
  ];

  @ViewChild('incidentMap', { static: true })
  incidentMap: IncidentMapComponent;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.initIncidentDetails(this.route.snapshot.data);
    this.route.data.subscribe(data => {
      this.initIncidentDetails(data);
    });
  }

  private initIncidentDetails(data: any): void {
    this.imageSlides = [];
    this.incident = data.incident;
    this.incidentLocation = this.incident.locationDetails.latLng;
    if (this.incidentMap) {
      this.incidentMap.intilalizeMap(this.incident.locationDetails.latLng);
    }
    this.incident.imageUrls.forEach(iu => this.imageSlides.push(new ImageSlide(iu)));
  }
}
