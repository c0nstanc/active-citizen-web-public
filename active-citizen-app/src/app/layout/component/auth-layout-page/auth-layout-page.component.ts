import { Component } from '@angular/core';
import { of, Observable } from 'rxjs';
import { faUserCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout-page.component.html',
  styleUrls: ['./auth-layout-page.component.scss']
})
export class AuthLayoutPageComponent {

  userCircle$: Observable<IconDefinition>;


  constructor() {
    this.initializeIcons();
  }

  private initializeIcons(): void {
    this.userCircle$ = this.loadUserCircle().pipe(startWith(faUserCircle));
  }

  private loadUserCircle(): Observable<IconDefinition> {
    return of(faUserCircle);
  }
}
