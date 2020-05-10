import { LatLng } from 'src/app/active-citizen/shared/incident-maps/component/my-location-map/model/lat-lng.model';

export class LocationDetails {
  constructor(
    public latLng: LatLng,
    public address: string) { }
}
