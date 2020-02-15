import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { IncidentService } from 'src/app/data/service/incident.service';
import { Incident } from 'src/app/data/schema/incident.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  incidents$: Observable<Incident[]>;

  constructor(
    // private modalService: NgbModal,
    private incidentService: IncidentService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.incidents$ = this.incidentService.getAll();
  }

  // openMyModal(): void {
  //   const modalRef = this.modalService.open(MyModalComponent);
  //   modalRef.componentInstance.id = 1;
  //   modalRef.result.then((result) => {
  //     console.log(result);
  //   });
  // }
}
