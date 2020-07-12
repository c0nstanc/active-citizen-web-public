import { Injectable } from '@angular/core';
import { HttpSessionService } from '../../http/service/session/http-session.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';



@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  private counterIntervalId: any;
  private counterActive: boolean;

  private sessionStartTime: moment.Moment;
  private momentToCheck: moment.Moment;

  public onSessionExpiration = new Subject<boolean>();

  constructor(
    private httpSessionService: HttpSessionService) {
    this.counterActive = true;
  }

  startExpirationCounter() {
    const sessionLifeInSeconds = 1800; // TODO - possibly we can have this configurable
    this.sessionStartTime = moment();
    this.momentToCheck = moment();
    let timePassedInSeconds: number;

    this.stopExpirationCounter();

    this.counterIntervalId = setInterval(() => {
      timePassedInSeconds = this.momentToCheck.diff(this.sessionStartTime, 'seconds');
      if (timePassedInSeconds >= sessionLifeInSeconds) {
        this.expireSession();
      }
      this.momentToCheck  = moment();
    }, 1000);
  }

  pauseExpirationCounter() {
    this.stopExpirationCounter();
    this.counterActive = false;
  }

  setExpirationCounterActive() {
    this.counterActive = true;
  }

  isExpirationCounterActive() {
    return this.counterActive;
  }

  public stopExpirationCounter() {
    if (this.counterIntervalId) {
      clearInterval(this.counterIntervalId);
      this.counterIntervalId = null;
    }
  }

  public expireSession(showModal: boolean = true): void {
    this.stopExpirationCounter();
    this.onSessionExpiration.next(showModal);
    this.httpSessionService.deleteSession().subscribe();
  }
}
