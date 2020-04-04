import { IncidentStatus } from './incident-status.model';
import { LocationDetails } from './location-details.model';
import { TimelineEvent } from 'src/app/shared/component/timeline/model/timeline-event.model';

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
  votes = 0;
  hits = 0;
  timelineEvents: TimelineEvent[] = [];
}
