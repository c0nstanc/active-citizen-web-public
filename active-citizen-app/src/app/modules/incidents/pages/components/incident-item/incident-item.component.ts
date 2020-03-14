import { Component, Input } from '@angular/core';
import { Incident } from '../../../../../data/schema/incident.model';
import { Observable, of } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { startWith } from 'rxjs/operators';
import { faImages } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-incident-item',
  templateUrl: './incident-item.component.html',
  styleUrls: ['./incident-item.component.scss']
})
export class IncidentItemComponent {
  @Input() incident: Incident;
  // flipped = false;

  images$: Observable<IconDefinition>;


  constructor() {
    this.initializeIcons();
  }

  private initializeIcons(): void {
    this.images$ = this.loadUserCircle().pipe(startWith(faImages));
  }

  private loadUserCircle(): Observable<IconDefinition> {
    return of(faImages);
  }
}
