import { AfterViewInit, Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { LatLng } from './model/lat-lng.model';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements AfterViewInit, OnInit {

  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;

  myLat: number;
  myLng: number;
  accuracy: number;
  myPossition: google.maps.LatLng;
  myLocationMarker: google.maps.Marker;

  @Output()
  markerUpdated = new EventEmitter<google.maps.Marker>();

  @ViewChild('googleMapContainer')
  gmap: ElementRef;

  ngOnInit(): void {
  }

  constructor() {
  }


  ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.myLat = position.coords.latitude;
      this.myLng = position.coords.longitude;
      this.accuracy = position.coords.accuracy;
      this.myPossition = new google.maps.LatLng(this.myLat, this.myLng);

      this.mapOptions = {
        center: this.myPossition,
        zoom: 15,
        mapTypeId: 'roadmap',
        mapTypeControl: true
      };

      this.myLocationMarker = new google.maps.Marker({
        position: this.myPossition,
        map: this.map,
        title: 'Problem Location',
        animation: google.maps.Animation.DROP,
      });
      this.myLocationMarker.addListener('click', () => {
        setTimeout(() => {
          this.myLocationMarker.setAnimation(null);
        }, 4000);
        this.myLocationMarker.setAnimation(google.maps.Animation.BOUNCE);
      });

      this.myLocationMarker.addListener('mouseup', () => {
        this.markerUpdated.emit(this.myLocationMarker);
      });

      this.mapInitializer();
      this.markerUpdated.emit(this.myLocationMarker);
    });

  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    this.myLocationMarker.setMap(this.map);
    this.myLocationMarker.setDraggable(true);
  }

  public getMarkerLocation(): LatLng {
    return new LatLng(
      this.myLocationMarker.getPosition().lat(),
      this.myLocationMarker.getPosition().lng()
    );
  }

}
