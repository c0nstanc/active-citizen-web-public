import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from 'src/app/core/service/logging/logging.service';
import { HdSpinnerService } from '@hd/hd-angular-components';
import { Spinner } from 'src/app/motorcycle/common/model/spinner/spinner.enum';
import { TranslateService } from '@ngx-translate/core';
import { QuoteService } from 'src/app/motorcycle/common/service/quote/quote.service';
import { BusinessErrorHandlingService } from 'src/app/motorcycle/common/service/error-message/business-error-handling.service';

export abstract class BaseResolver<T> implements Resolve<T>{

  constructor(
    protected loggingService: LoggingService,
    protected businessErrorHandlingService: BusinessErrorHandlingService,
    protected hdSpinnerService: HdSpinnerService,
  ) { }

  abstract resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | any;

  handleError(error: HttpErrorResponse): Observable<T> {

    this.loggingService.error(`${error}`);
    this.hdSpinnerService.hide(Spinner.FULL_PAGE);
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
      translateService.currentLang = 'en';
    } else if ((language === 'el_GR' || language === 'el') && (translateService.currentLang !== 'el')) {
      translateService.use('el');
      translateService.currentLang = 'el';
    }
    return initializationDone;
  }

  initializeQuoteReference(route: ActivatedRouteSnapshot, quoteService: QuoteService): void {
    const existingQuoteReference = route.queryParamMap.get('quoteReference');
    if (existingQuoteReference) {
      quoteService.setQuoteReference(existingQuoteReference);
    }
  }
}
