import { IncidentStatus } from './incident-status.model';
import { LocationDetails } from './location-details.model';

export class Incident {
  id: string;
  locationDetails: LocationDetails;
  name: string;
  description: string;
  category: string;
  status: IncidentStatus;
  imageUrls: string[] = [];

}
