import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProgressItem } from './model/progress-item.model';

@Component({
  selector: 'app-progress-indigator',
  templateUrl: './progress-indigator.component.html',
  styleUrls: ['./progress-indigator.component.scss']
})
export class ProgressIndigatorComponent implements OnInit, OnChanges {

  @Input()
  progressItems: ProgressItem[] = [];

  @Input()
  currentState;

  @Input()
  vertical = false;

  constructor() { }

  ngOnInit(): void {
    this.updateProgress(this.currentState);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateProgress(changes.currentState.currentValue);
  }

  private updateProgress(currentState: string): void {
    this.progressItems.forEach(pi => pi.completed = false);
    const progressStateNumber = this.progressItems
      .findIndex(pi => pi.state === currentState);
    if (progressStateNumber >= 0) {
      this.progressItems.slice(0, progressStateNumber + 1)
        .forEach(pi => pi.completed = true);
    }
  }
}
