import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  public generalErrorOccured = new ReplaySubject<boolean>(1);
  public technicalIssueErrorOccured = new ReplaySubject<boolean>(1);

  constructor() { }

  showGeneralErrorMessage(): void {
    this.generalErrorOccured.next(true);
  }

  showTechnicalIssueErrorMessage(): void {
    this.technicalIssueErrorOccured.next(true);
  }

}
