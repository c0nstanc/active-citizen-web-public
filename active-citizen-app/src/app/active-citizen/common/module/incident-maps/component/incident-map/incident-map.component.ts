import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LatLng } from 'src/app/active-citizen/common/model/location/lat-lng.model';

@Component({
  selector: 'ac-incident-map',
  templateUrl: './incident-map.component.html',
  styleUrls: ['./incident-map.component.scss']
})
export class IncidentMapComponent implements AfterViewInit {

  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;
  incidentMarker: google.maps.Marker;

  incidentPossition: google.maps.LatLng;

  @ViewChild('incidentMap', { static: true })
  gmap: ElementRef;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.mapInitializer(this.incidentPossition);
  }

  public intilalizeMap(incidentPossition: LatLng): void {
    this.incidentPossition = new google.maps.LatLng(incidentPossition.lat, incidentPossition.lng);
    this.mapInitializer(this.incidentPossition);
  }

  private mapInitializer(incidentPossition: google.maps.LatLng): void {
    this.map = this.setupMap(incidentPossition);
    this.setupMarker(incidentPossition, this.map);
  }

  private setupMap(incidentPossition: google.maps.LatLng): google.maps.Map {
    const defaultPosition = new google.maps.LatLng(
      35.185471,
      33.389757);

    this.mapOptions = {
      center: incidentPossition ? incidentPossition : defaultPosition,
      zoom: incidentPossition ? 18 : 2,
      mapTypeId: 'roadmap',
      mapTypeControl: false
    };

    return new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);

  }

  private setupMarker(incidentPossition: google.maps.LatLng, googleMap: google.maps.Map): void {
    if (incidentPossition) {
      this.incidentMarker = new google.maps.Marker({
        position: incidentPossition,
        map: googleMap,
        title: 'Problem Location',
        animation: google.maps.Animation.DROP,
      });

      this.incidentMarker.addListener('click', () => {
        setTimeout(() => {
          this.incidentMarker.setAnimation(null);
        }, 4000);
        this.incidentMarker.setAnimation(google.maps.Animation.BOUNCE);
      });
      this.incidentMarker.setMap(googleMap);
      this.incidentMarker.setDraggable(false);
    }
  }
}
