import { IncidentStatus } from './incident-status.model';
import { LatLng } from 'src/app/shared/component/google-map/model/lat-lng.model';

export class Incident {
  id: string;
  latLng: LatLng;
  name: string;
  description: string;
  category: string;
  status: IncidentStatus;
  imageUrls: string[] = [];

}
