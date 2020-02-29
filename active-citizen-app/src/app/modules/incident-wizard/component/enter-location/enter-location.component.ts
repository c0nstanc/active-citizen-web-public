import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-location',
  templateUrl: './enter-location.component.html',
  styleUrls: ['./enter-location.component.scss']
})
export class EnterLocationComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLocationConfirmed(): void {
    this.router.navigate(['incidents/new-incident/1']);
  }
}
