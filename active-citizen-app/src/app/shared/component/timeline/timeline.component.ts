import { Component, OnInit, Input } from '@angular/core';
import { TimelineEvent } from './model/timeline-event.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input()
  timelineEvents: TimelineEvent[];

  constructor() { }

  ngOnInit(): void {
  }

  getOrderedTimelineEvents(): TimelineEvent[] {
    return this.timelineEvents.sort((a, b) => a.creationDate > b.creationDate ? 1 : a.creationDate < b.creationDate ? -1 : 0);
  }
}
