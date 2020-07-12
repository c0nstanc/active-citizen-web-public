import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MomentDetectionService {

  private momentToCheck: moment.Moment;
  private endOfDay: moment.Moment;

  dayChanged: Subject<Date>;

  constructor() { }

  initializeDayChangeDetection(): void {
    if (!this.dayChanged) {
      this.dayChanged = new Subject<Date>();
      let remainingSeconds: number;
      this.momentToCheck = moment();
      this.endOfDay = moment('24:00:00', 'hh:mm:ss');
      setInterval(() => {
        remainingSeconds = this.endOfDay.diff(this.momentToCheck, 'seconds');
        if (remainingSeconds <= 0) {
          this.dayChanged.next(moment().toDate());
          this.endOfDay = this.endOfDay.add(1, 'days');
        }
        this.momentToCheck = moment();
      }, 1000);
    }
  }
}
