import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { startWith } from 'rxjs/operators';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { Incident } from 'src/app/data/schema/incident.model';

@Component({
  selector: 'ac-incident-item',
  templateUrl: './incident-item.component.html',
  styleUrls: ['./incident-item.component.scss']
})
export class IncidentItemComponent {
  @Input() incident: Incident;

  @Output()
  hoverEnter = new EventEmitter<Incident>();

  @Output()
  hoverLeave = new EventEmitter<Incident>();

  images$: Observable<IconDefinition>;

  constructor() {
    this.initializeIcons();
  }

  onMouseEnter(): void {
    this.hoverEnter.emit(this.incident);
  }

  onMouseLeave(): void {
    this.hoverLeave.emit(this.incident);
  }

  private initializeIcons(): void {
    this.images$ = this.loadUserCircle().pipe(startWith(faImages));
  }

  private loadUserCircle(): Observable<IconDefinition> {
    return of(faImages);
  }
}
