import { AfterViewInit, Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { LatLng } from './model/lat-lng.model';

@Component({
  selector: 'app-my-location-map',
  templateUrl: './my-location-map.component.html',
  styleUrls: ['./my-location-map.component.scss']
})
export class MyLocationMapComponent implements AfterViewInit {

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

  @ViewChild('myLocationMapContainer')
  gmap: ElementRef;

  constructor() {
  }


  ngAfterViewInit(): void {
    const defaultPosition = new google.maps.LatLng(
      35.185471,
      33.389757);
    this.getMyLocation();
    this.mapInitializer(defaultPosition);
  }

  getMyLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('My Position accuracy: ' + position.coords.accuracy);
      const myPosition = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude);
      this.mapInitializer(myPosition);
    });

  }

  mapInitializer(myPosition: google.maps.LatLng): void {
    this.map = this.setupMap(myPosition);
    this.createMyLocationControl(this.map);
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
          this.onAddressUpdated(results[0].formatted_address);
        } else {
          this.onAddressUpdated('Unable to get address');
        }
      } else {
        this.onAddressUpdated('Unable to get address');
      }
    });
  }



  private createMyLocationControl(map: google.maps.Map): void {

    const getMyLocationDiv = document.createElement('div');
    getMyLocationDiv.style.backgroundColor = '#fff';
    getMyLocationDiv.style.border = '2px solid #fff';
    getMyLocationDiv.style.borderRadius = '3px';
    getMyLocationDiv.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    getMyLocationDiv.style.cursor = 'pointer';
    getMyLocationDiv.style.textAlign = 'center';
    getMyLocationDiv.style.marginRight = '10px';
    getMyLocationDiv.style.bottom = '110px';
    getMyLocationDiv.style.height = '40px';
    getMyLocationDiv.style.width = '40px';
    getMyLocationDiv.style.display = 'flex';
    getMyLocationDiv.style.alignItems = 'center';
    getMyLocationDiv.style.justifyContent = 'center';
    getMyLocationDiv.title = 'Get my location';

    const getMyLocationIcon = document.createElement('div');
    getMyLocationIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"'
      + ' width="24" height="24" viewBox="0 0 24 24"><path d="M12 8c-2.21 0-4 ' +
      '1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.' +
      '94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 ' +
      '7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>';

    getMyLocationDiv.appendChild(getMyLocationIcon);

    getMyLocationDiv.addEventListener('click', () => {
      this.getMyLocation();
    });

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(getMyLocationDiv);
  }

}
