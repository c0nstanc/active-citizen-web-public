import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { Language } from './model/language.model';


@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit {

  appName: string;

  supportedLanguages: Language[];

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.appName = environment.company;
    this.supportedLanguages = environment.supportedLanguages;
  }

  onLanguageSelected(language: Language): void {
    this.translateService.use(language.code);
  }


}
