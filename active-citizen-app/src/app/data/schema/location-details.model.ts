import { LatLng } from '../../shared/component/google-map/model/lat-lng.model';

export class LocationDetails {
  constructor(
    public latLng: LatLng,
    public address: string) { }
}
