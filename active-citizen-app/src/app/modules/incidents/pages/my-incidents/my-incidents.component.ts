import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { IncidentService } from 'src/app/data/service/incident.service';
import { Incident } from 'src/app/data/schema/incident.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './my-incidents.component.html',
  styleUrls: ['./my-incidents.component.scss']
})
export class MyIncidentsComponent implements OnInit {

  incidents$: Observable<Incident[]>;

  constructor(
    private router: Router,
    private incidentService: IncidentService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }



  createIncident(): void {
    this.router.navigate(['incidents/new-incident']);
  }

  private loadProjects(): void {
    this.incidents$ = this.incidentService.getAll();
  }
}
