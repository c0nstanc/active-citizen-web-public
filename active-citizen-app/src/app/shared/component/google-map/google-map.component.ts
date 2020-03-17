import { AfterViewInit, Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { LatLng } from './model/lat-lng.model';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements AfterViewInit {

  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;

  myPosition: google.maps.LatLng;
  myLocationMarker: google.maps.Marker;

  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();

  @Output()
  markerUpdated = new EventEmitter<LatLng>();

  @Output()
  addressUpdated = new EventEmitter<string>();

  @ViewChild('googleMapContainer')
  gmap: ElementRef;

  constructor() {
  }


  ngAfterViewInit(): void {
    const defaultPosition = new google.maps.LatLng(
      35.185471,
      33.389757);

    navigator.geolocation.getCurrentPosition(position => {
      console.log('My Position accuracy: ' + position.coords.accuracy);
      const myPosition = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude);
      this.mapInitializer(myPosition);
    });

    this.mapInitializer(defaultPosition);
  }

  mapInitializer(myPosition: google.maps.LatLng): void {
    this.map = this.setupMap(myPosition);
    this.setupMarker(myPosition, this.map);
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

  setupMarker(myPosition: google.maps.LatLng, googleMap: google.maps.Map): void {
    this.myLocationMarker = new google.maps.Marker({
      position: myPosition,
      map: googleMap,
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
      this.onMarkerUpdated(this.myLocationMarker);
      this.getAddressFromLocation();
    });

    this.myLocationMarker.setMap(googleMap);
    this.myLocationMarker.setDraggable(true);
    this.onMarkerUpdated(this.myLocationMarker);
    this.getAddressFromLocation();
  }

  private onMarkerUpdated(marker: google.maps.Marker) {
    this.markerUpdated.emit(this.getMarkerLatLng(marker));
  }

  private onAddressUpdated(address: string) {
    this.addressUpdated.emit(address);
  }

  private getMarkerLatLng(marker: google.maps.Marker): LatLng {
    return new LatLng(
      marker.getPosition().lat(),
      marker.getPosition().lng()
    );
  }

  private getAddressFromLocation() {
    this.geocoder.geocode({
      location: new LatLng(
        this.myLocationMarker.getPosition().lat(),
        this.myLocationMarker.getPosition().lng()
      )
    }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.map.setZoom(11);
          this.infowindow.setContent(results[0].formatted_address);
          this.infowindow.open(this.map, this.myLocationMarker);
          this.addressUpdated.emit(results[0].formatted_address);
        } else {
          this.addressUpdated.emit('');
        }
      } else {
        this.addressUpdated.emit('');
      }
    });
  }

}
