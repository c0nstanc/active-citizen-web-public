export class TimelineEvent {
  constructor(
    public creationDate: Date,
    public event: string,
    public comments: string[] = []) { }
}
