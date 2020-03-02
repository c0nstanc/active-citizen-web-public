import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-enter-incident-photo',
  templateUrl: './enter-incident-photo.component.html',
  styleUrls: ['./enter-incident-photo.component.scss']
})
export class EnterIncidentPhotoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onNxtBtnClicked(): void {
    this.router.navigate(['incidents/new-incident/']);
  }

}
