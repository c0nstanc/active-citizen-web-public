import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hd-window-beforeunload',
  templateUrl: './window-beforeunload.component.html',
  styleUrls: ['./window-beforeunload.component.scss']
})
export class WindowBeforeunloadComponent implements OnInit {

  constructor() { }

  @Output()
  windowBeforeUnloaded = new EventEmitter<void>();

  ngOnInit(): void {
  }

  onWindowBeforeUnload(): void {
    this.windowBeforeUnloaded.emit();
  }

}
