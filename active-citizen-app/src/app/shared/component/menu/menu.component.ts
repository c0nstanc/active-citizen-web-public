import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OptionGroup } from './model/option-group.model';
import { NavLink } from './model/nav-link.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  @Input()
  menuTitle: string;

  @Input()
  matIcon: string;

  @Input()
  optionGroups: OptionGroup[] = [];

  ngOnInit(): void {
  }

  optionClicked(option: NavLink): void {
    this.router.navigate([option.path]);
  }
}
