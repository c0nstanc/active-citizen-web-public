import { LatLng } from './lat-lng.model';

export class LocationDetails {
  constructor(
    public latLng: LatLng,
    public address: string) { }
}
