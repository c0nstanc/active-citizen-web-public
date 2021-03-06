import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translateService: TranslateService){
    this.translateService.setDefaultLang(environment.defaultLanguage.code);
    this.translateService.use(environment.defaultLanguage.code);

  }
}
