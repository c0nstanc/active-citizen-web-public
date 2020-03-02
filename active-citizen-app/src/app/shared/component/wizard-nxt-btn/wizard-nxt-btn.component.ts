import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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


  @Output()
  clicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clicked.emit();
  }

}
