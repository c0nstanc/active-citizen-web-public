import { AfterViewInit, Component, ViewChild, ElementRef, Input } from '@angular/core';



@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements AfterViewInit {

  map: google.maps.Map;

  lat1 = 40.730610;
  lng1 = -73.935242;
  marker1Possition = new google.maps.LatLng(this.lat1, this.lng1);

  lat2 = 40.730630;
  lng2 = -73.935242;
  marker2Possition = new google.maps.LatLng(this.lat2, this.lng2);

  mapOptions: google.maps.MapOptions = {
    center: this.marker1Possition,
    zoom: 8,
    mapTypeId: 'satellite',
    mapTypeControl: true
  };


  marker1: google.maps.Marker = new google.maps.Marker({
    position: this.marker1Possition,
    map: this.map,
    label: 'home'
  });

  marker2: google.maps.Marker = new google.maps.Marker({
    position: this.marker2Possition,
    map: this.map,
    label: 'work'

  });



  @ViewChild('googleMapContainer', { static: false })
  gmap: ElementRef;

  constructor() {
  }


  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    this.marker1.setMap(this.map);
    this.marker1.setDraggable(true);
    this.marker2.setMap(this.map);
    this.marker2.setDraggable(true);
  }

}
