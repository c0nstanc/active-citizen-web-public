import { LatLng } from '../location/lat-lng.model';

export class IncidentMarker {

  constructor(
    public latLng: LatLng,
    public label: string,
    public color: string) { }
}
