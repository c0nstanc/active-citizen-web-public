import { Injectable } from '@angular/core';
import { Incident } from 'src/app/data/schema/incident.model';
import { BehaviorSubject } from 'rxjs';
import { IncidentStatus } from 'src/app/data/schema/incident-status.model';
import { IncidentService } from 'src/app/data/service/incident.service';
import { ClonerService } from 'src/app/core/services/cloner.service';
import { LocationDetails } from 'src/app/data/schema/location-details.model';

@Injectable({
  providedIn: 'root'
})
export class NewIncidentWizardService {

  private newIncident: Incident;

  newIncidedUpdated: BehaviorSubject<Incident>;

  constructor(
    private incidentService: IncidentService,
    private clonerService: ClonerService
  ) {
    this.initializeIncident();
  }

  public setIncidentId(id: string): void {
    this.newIncident.id = id;
    this.newIncidedUpdated.next(this.newIncident);
  }

  public setIncidentCategory(category: string): void {
    this.newIncident.category = category;
    this.newIncidedUpdated.next(this.newIncident);
  }

  public setIncidentSubcategory(subcategory: string): void {
    this.newIncident.subcategory = subcategory;
    this.newIncidedUpdated.next(this.newIncident);
  }


  public setIncidentLocationDetails(locationDetails: LocationDetails): void {
    this.newIncident.locationDetails = locationDetails;
    this.newIncidedUpdated.next(this.newIncident);
  }

  public setIncidentDescription(desc: string): void {
    this.newIncident.description = desc;
    this.newIncidedUpdated.next(this.newIncident);
  }

  public setIncidentUrls(incidentImageUrls: string[]): void {
    this.newIncident.imageUrls = incidentImageUrls;
    this.newIncidedUpdated.next(this.newIncident);
  }

  public submitIncident() {
    this.newIncident.status = IncidentStatus.SUBMITTED;
    this.newIncident.created = new Date();
    this.incidentService.addNewIncident(this.clonerService.deepClone(this.newIncident));
  }

  private initializeIncident() {
    this.newIncident = new Incident();
    this.newIncident.status = IncidentStatus.CREATED;
    this.newIncidedUpdated = new BehaviorSubject(null);
  }

}
