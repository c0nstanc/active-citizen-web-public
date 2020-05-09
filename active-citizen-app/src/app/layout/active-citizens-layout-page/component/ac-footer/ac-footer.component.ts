import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ac-footer',
  templateUrl: './ac-footer.component.html',
  styleUrls: ['./ac-footer.component.scss']
})
export class AcFooterComponent implements OnInit {

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
