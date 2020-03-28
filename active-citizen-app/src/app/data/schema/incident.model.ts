import { IncidentStatus } from './incident-status.model';
import { LocationDetails } from './location-details.model';

export class Incident {
  id: string;
  locationDetails: LocationDetails;
  category: string;
  subcategory: string;
  description: string;
  status: IncidentStatus;
  imageUrls: string[] = [];
  created: Date;
  updated: Date;
  votes: number;
  hits: number;
}
