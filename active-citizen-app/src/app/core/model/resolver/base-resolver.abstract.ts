import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { LoggingService } from '../../services/logging/logging.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusinessErrorHandlingService } from 'src/app/active-citizen/common/service/error-message/business-error-handling.service';

export abstract class BaseResolver<T> implements Resolve<T>{

  constructor(
    protected loggingService: LoggingService,
    protected businessErrorHandlingService: BusinessErrorHandlingService,
    protected spinnerService: NgxSpinnerService,
  ) { }

  abstract resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | any;

  handleError(error: HttpErrorResponse): Observable<T> {

    this.loggingService.error(`${error}`);
    this.spinnerService.hide();
    this.businessErrorHandlingService.showAppropriateErrorMessage(error);
    return EMPTY;
  }

  initializeLanguage(route: ActivatedRouteSnapshot, translateService: TranslateService): boolean {
    let initializationDone = false;
    const language = route.queryParamMap.get('lang');

    if (language === 'en_GB' || language === 'el_GR' || language === 'en' || language === 'el') {
      initializationDone = true;
    }

    if (((language === 'en_GB' || language === 'en')) && (translateService.currentLang !== 'en')) {
      translateService.use('en');
      translateService.currentLang = 'en'; // TODO - See how to get rid of these
    } else if ((language === 'el_GR' || language === 'el') && (translateService.currentLang !== 'el')) {
      translateService.use('el');
      translateService.currentLang = 'el'; // TODO - See how to get rid of these
    }
    return initializationDone;
  }
}
