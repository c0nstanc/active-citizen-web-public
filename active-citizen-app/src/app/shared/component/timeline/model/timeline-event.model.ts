import { Event } from './event.enum';

export class TimelineEvent {
  constructor(
    public creationDate: Date,
    public event: Event,
    public comments: string) { }
}
