import { Injectable } from '@angular/core';
import { Incident } from 'src/app/data/schema/incident.model';
import { BehaviorSubject } from 'rxjs';
import { IncidentStatus } from 'src/app/data/schema/incident-status.model';
import { LatLng } from 'src/app/shared/component/google-map/model/lat-lng.model';

@Injectable({
  providedIn: 'root'
})
export class NewIncidentWizardService {

  private newIncident: Incident;

  newIncidedUpdated: BehaviorSubject<Incident>;

  constructor() {
    this.initializeIncident();
  }

  public setIncidentId(id: string): void {
    this.newIncident.id = id;
    this.newIncidedUpdated.next(this.newIncident);
  }

  public setIncidentName(name: string): void {
    this.newIncident.name = name;
    this.newIncidedUpdated.next(this.newIncident);
  }

  public setIncidentLatLng(latLng: LatLng): void {
    this.newIncident.latLng = latLng;
    this.newIncidedUpdated.next(this.newIncident);
  }

  public setIncidentDescription(desc: string): void {
    this.newIncident.description = desc;
    this.newIncidedUpdated.next(this.newIncident);
  }

  public setIncidentCategory(category: string): void {
    this.newIncident.category = category;
    this.newIncidedUpdated.next(this.newIncident);
  }

  public setIncidentUrls(incidentImageUrls: string[]): void {
    this.newIncident.imageUrls = incidentImageUrls;
    this.newIncidedUpdated.next(this.newIncident);
  }

  private initializeIncident() {
    this.newIncident = new Incident();
    this.newIncident.status = IncidentStatus.CREATED;
    this.newIncidedUpdated = new BehaviorSubject(this.newIncident);
  }

}
