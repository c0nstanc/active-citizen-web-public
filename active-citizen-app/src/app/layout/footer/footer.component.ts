import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version: string;
  currentYear: number;
  companyTitle: string;


  constructor() { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.companyTitle = environment.company;
    this.version = environment.version;

  }



}
