import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BusinessErrorHandlingService } from 'src/app/active-citizen/common/service/error-message/business-error-handling.service';
import { NgxSpinnerService } from 'ngx-spinner';


export abstract class HttpBase {

  constructor(
    protected businessErrorHandlingService: BusinessErrorHandlingService,
    protected spinnerService?: NgxSpinnerService
  ) { }


  handleError(err: HttpErrorResponse): Observable<any> {
    this.businessErrorHandlingService.showAppropriateErrorMessage(err);
    this.spinnerService?.hide();
    return throwError(err);
  }
}

