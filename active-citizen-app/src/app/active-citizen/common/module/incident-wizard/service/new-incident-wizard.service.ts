import { Injectable } from '@angular/core';
import { Incident } from 'src/app/active-citizen/common/model/incident/incident.model';
import { BehaviorSubject } from 'rxjs';
import { IncidentStatus } from 'src/app/active-citizen/common/model/incident/incident-status.model';
import { LocationDetails } from 'src/app/active-citizen/common/model/location/location-details.model';
import { IncidentService } from '../../../service/incident.service';
import { ClonerUtils } from 'src/app/core/util/clone/cloner-utils.model';


@Injectable()
export class NewIncidentWizardService {

  private newIncident: Incident;
  private newIncidentFiles: File[];

  newIncidentUpdated: BehaviorSubject<Incident>;
  newIncidentFilesUpdated: BehaviorSubject<File[]>;


  constructor(
    private incidentService: IncidentService,
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

  public submitIncident(): void {
    this.newIncident.status = IncidentStatus.SUBMITTED;
    this.newIncident.created = new Date();
    this.incidentService.addNewIncident(ClonerUtils.deepClone(this.newIncident));
    this.initializeIncident();
  }

  private initializeIncident(): void {
    this.newIncident = new Incident();
    this.newIncidentFiles = [];
    this.newIncident.status = IncidentStatus.CREATED;
    this.newIncidentUpdated = new BehaviorSubject(this.newIncident);
    this.newIncidentFilesUpdated = new BehaviorSubject([]);
  }

  onIncidentUpdated(incident: Incident): void {
    this.newIncidentUpdated.next(incident);
  }

  private covertFilesToImageUrls(): void {
    this.newIncident.imageUrls = [];
    this.newIncidentFiles.forEach(file => {
      if (file.type.match(/image\/*/) != null) {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: ProgressEvent) => {
          if (event.loaded) {
            this.newIncident.imageUrls = [...this.newIncident.imageUrls, (reader.result as string)];
            this.onIncidentUpdated(this.newIncident);
          }
        };
      }
    });
  }

}
