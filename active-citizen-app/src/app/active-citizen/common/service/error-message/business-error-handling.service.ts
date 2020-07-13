import { Injectable } from '@angular/core';
import { ErrorMessageService } from './error-message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorStatus } from 'src/app/core/http/model/error/http-error-status.enum';
import { LoggingService } from 'src/app/core/services/logging/logging.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessErrorHandlingService {

  constructor(
    private errorMessageService: ErrorMessageService,
    private loggingService: LoggingService
  ) { }


  // Example
  showAppropriateErrorMessage(error: HttpErrorResponse): void {
    if (error.status === HttpErrorStatus.BAD_REQUEST) {
      this.loggingService.error(`error: ${error}`);
      this.errorMessageService.showTechnicalIssueErrorMessage();
    } else if (error.status === HttpErrorStatus.UNPROCESSABLE_ENTITY) {
      this.loggingService.error(`error: ${error}`);
      this.errorMessageService.showNoBundlesForYouErrorMessage();
    } else {
      this.loggingService.error(`error: ${error}`);
      this.errorMessageService.showGeneralErrorMessage();
    }
  }

}


