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
  private newIncidentFiles: File[]

  newIncidentUpdated: BehaviorSubject<Incident>;
  newIncidentFilesUpdated: BehaviorSubject<File[]>;


  constructor(
    private incidentService: IncidentService,
    private clonerService: ClonerService
  ) {
    this.initializeIncident();
  }

  public setIncidentId(id: string): void {
    this.newIncident.id = id;
    this.onIncidentUpdated(this.newIncident);
  }

  public setIncidentDetails(category: string, subcategory: string, desc: string): void {
    this.newIncident.category = category;
    this.newIncident.subcategory = subcategory;
    this.newIncident.description = desc;
    this.onIncidentUpdated(this.newIncident);
  }

  public setIncidentLocationDetails(locationDetails: LocationDetails): void {
    this.newIncident.locationDetails = locationDetails;
    this.onIncidentUpdated(this.newIncident);
  }

  public setIncidentFiles(newIncidentFiles: File[]): void {
    this.newIncidentFiles = newIncidentFiles;
    this.newIncidentFilesUpdated.next(this.newIncidentFiles);
    this.covertFilesToImageUrls();
  }

  public submitIncident() {
    this.newIncident.status = IncidentStatus.SUBMITTED;
    this.newIncident.created = new Date();
    this.incidentService.addNewIncident(this.clonerService.deepClone(this.newIncident));
    this.initializeIncident();
  }

  private initializeIncident() {
    this.newIncident = new Incident();
    this.newIncidentFiles = [];
    this.newIncident.status = IncidentStatus.CREATED;
    this.newIncidentUpdated = new BehaviorSubject(this.newIncident);
    this.newIncidentFilesUpdated = new BehaviorSubject([]);
  }

  onIncidentUpdated(incident: Incident) {
    this.newIncidentUpdated.next(this.clonerService.deepClone(incident));
  }

  private covertFilesToImageUrls() {
    this.newIncident.imageUrls = [];
    this.newIncidentFiles.forEach(file => {
      if (file.type.match(/image\/*/) != null) {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: ProgressEvent) => {
          if (event.loaded) {
            this.newIncident.imageUrls.push(reader.result as string);
            this.onIncidentUpdated(this.newIncident);
          }
        };
      }
    });
  }

}
