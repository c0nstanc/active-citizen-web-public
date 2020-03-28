import { Component, OnInit } from '@angular/core';
import { TimelineEvent } from './model/timeline-event.model';
import { Event } from './model/event.enum';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  timelineEvents: TimelineEvent[];

  constructor() { }

  ngOnInit(): void {
    this.timelineEvents = [
      new TimelineEvent(
        new Date('2019-01-16'),
        Event.SUBMITTED,
        'I am submitting the issue'),
      new TimelineEvent(
        new Date('2020-01-16'),
        Event.ACKNOWLEDGED,
        'I am acknowledging the issue'),
      new TimelineEvent(
        new Date('2020-03-18'),
        Event.RESOLVED,
        'I resolved the issue'),
      new TimelineEvent(
        new Date('2020-03-29T00:00:00'),
        Event.CLOSED,
        'I closed the issue'),
    ];
  }
  getOrderedTimelineEvents(): TimelineEvent[] {
    return this.timelineEvents.sort((a, b) => a.creationDate < b.creationDate ? 1 : a.creationDate > b.creationDate ? -1 : 0);
  }
}
