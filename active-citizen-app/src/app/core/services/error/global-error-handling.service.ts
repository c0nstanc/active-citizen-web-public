import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from '../logging/logging.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlingService implements ErrorHandler {

  constructor(
    private loggingService: LoggingService
  ) { }


  handleError(error: Error | HttpErrorResponse): void {
    this.loggingService.error(`${error}`);
  }

}
