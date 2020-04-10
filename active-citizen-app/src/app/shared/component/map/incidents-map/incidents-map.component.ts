import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { IncidentMarker } from './model/incident-marker.model';
import { LatLng } from '../my-location-map/model/lat-lng.model';

@Component({
  selector: 'app-incidents-map',
  templateUrl: './incidents-map.component.html',
  styleUrls: ['./incidents-map.component.scss']
})
export class IncidentsMapComponent implements AfterViewInit {

  @Input()
  incidentMarkers: IncidentMarker[];
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;

  googleMarkers: google.maps.Marker[] = [];

  @ViewChild('incidentsMapContainer')
  gmap: ElementRef;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.googleMarkers = [];
    this.map = this.setupMap(this.calculateCenterLocation());
    this.incidentMarkers.forEach(incidentMarker => {
      this.setMarkerOnMap(incidentMarker, this.map);
    });
  }

  private calculateCenterLocation(): google.maps.LatLng {
    if (this.incidentMarkers && this.incidentMarkers.length > 0) {
      const latLngs = this.incidentMarkers.map(incidentMarker => incidentMarker.latLng).filter(latLng => latLng);
      if (latLngs.length > 1) {
        const maxLat = latLngs.reduce((prev, current) => (prev.lat > current.lat) ? prev : current).lat;
        const minLat = latLngs.reduce((prev, current) => (prev.lat < current.lat) ? prev : current).lat;
        const maxLng = latLngs.reduce((prev, current) => (prev.lng > current.lng) ? prev : current).lng;
        const minLng = latLngs.reduce((prev, current) => (prev.lng < current.lng) ? prev : current).lng;
        return new google.maps.LatLng(
          (maxLat + minLat) / 2,
          (maxLng + minLng) / 2);
      } else if (latLngs.length === 1) {
        return new google.maps.LatLng(
          latLngs[0].lat,
          latLngs[0].lng);
      }
    }
    return new google.maps.LatLng(
      35.185471,
      33.389757);

  }

  public startBounceMarker(markerLatLng: LatLng): void {
    const marker = this.getGoogleMarker(markerLatLng);
    if (marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  public stopBounceMarker(markerLatLng: LatLng): void {
    const marker = this.getGoogleMarker(markerLatLng);
    if (marker) {
      marker.setAnimation(null);
    }
  }

  setupMap(myPosition: google.maps.LatLng): google.maps.Map {
    this.mapOptions = {
      center: myPosition,
      zoom: 15,
      mapTypeId: 'roadmap',
      mapTypeControl: true
    };

    return new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
  }

  setMarkerOnMap(incidentMarker: IncidentMarker, googleMap: google.maps.Map): void {
    if (incidentMarker.latLng) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(incidentMarker.latLng.lat, incidentMarker.latLng.lng),
        map: googleMap,
        title: incidentMarker.label,
        animation: google.maps.Animation.DROP,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
        }
      });

      // const contentString: string = incidentMarker.label;
      // const infowindow = new google.maps.InfoWindow({
      //   content: contentString
      // });

      marker.addListener('click', () => {
        setTimeout(() => {
          marker.setAnimation(null);
        }, 4000);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        //infowindow.open(googleMap, marker);
      });

      marker.setMap(googleMap);
      marker.setDraggable(false);
      this.googleMarkers.push(marker);
    }
  }

  private getGoogleMarker(markerLatLng: LatLng): google.maps.Marker {
    return this.googleMarkers.find(gm =>
      gm.getPosition().lat() === markerLatLng.lat &&
      gm.getPosition().lng() === markerLatLng.lng
    );
  }
}
