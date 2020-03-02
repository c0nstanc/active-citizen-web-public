import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wizard-nxt-btn',
  templateUrl: './wizard-nxt-btn.component.html',
  styleUrls: ['./wizard-nxt-btn.component.scss']
})
export class WizardNxtBtnComponent implements OnInit {

  @Input()
  type: string;

  @Input()
  disabled = false;


  constructor() { }

  ngOnInit(): void {
  }

}
