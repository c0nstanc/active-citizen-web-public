import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { startWith } from 'rxjs/operators';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { Incident } from 'src/app/data/schema/incident.model';

@Component({
  selector: 'app-incident-item',
  templateUrl: './incident-item.component.html',
  styleUrls: ['./incident-item.component.scss']
})
export class IncidentItemComponent {
  @Input() incident: Incident;

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
