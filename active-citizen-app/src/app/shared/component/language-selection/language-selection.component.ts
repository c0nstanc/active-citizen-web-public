import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Language } from './model/language.model';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';


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
    this.supportedLanguages = [new Language('Ελληνικά', 'el'),
    new Language('English', 'en')];

  }

  onLanguageSelected(language: Language): void {
    this.translateService.use(language.code);
  }


}
