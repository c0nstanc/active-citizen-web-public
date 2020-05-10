import { LatLng } from '../../my-location-map/model/lat-lng.model';

export class IncidentMarker {

  constructor(
    public latLng: LatLng,
    public label: string,
    public color: string) { }
}
