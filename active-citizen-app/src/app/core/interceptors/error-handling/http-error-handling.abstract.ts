import { ErrorHandler } from '@angular/core';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { HttpErrorStatus } from '../../http/model/error/http-error-status.enum';
import { LoggingService } from '../../services/logging/logging.service';


export class HttpErrorHandling implements ErrorHandler {

  constructor(
    protected loggingService: LoggingService
  ) { }

  public handleError(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    let errorMessage = '';
    let handled = false;

    if (error instanceof HttpErrorResponse) {

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error Event: ${error.error.message}`;
        this.loggingService.error(errorMessage);

      } else {
        // Server-side error
        errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
        handled = this.handleServerError(error.status);
        this.loggingService.error(errorMessage);
      }
    } else {
      // something else happenned
      errorMessage = `Unexpected Error: ${error}`;
      this.loggingService.error(errorMessage);
    }

    if (handled) {
      return EMPTY;
    } else {
      return throwError(error);
    }
  }


  handleServerError(errorStatus: number): boolean {
    switch (errorStatus) {
      case HttpErrorStatus.BAD_REQUEST:
        // Bad Request
        break;
      case HttpErrorStatus.UNAUTHORIZED_REQUEST:
        // Unauthorized Request
        break;
      case HttpErrorStatus.FORBIDDEN_REQUEST:
        // Forbidden Request
        break;
      case HttpErrorStatus.NOT_FOUND:
        // Not Found
        break;
      case HttpErrorStatus.METHOD_NOT_ALLOED:
        // Method not allowed
        break;
      case HttpErrorStatus.REQUEST_TIMEOUT:
        // Request Timeout
        break;
      case HttpErrorStatus.CONFLICT:
        // Conflict
        break;
      case HttpErrorStatus.UNPROCESSABLE_ENTITY:
        // Unprocessable entity
        break;
      case HttpErrorStatus.INTERNAL_SERVER_ERROR: // Internal server error
      case HttpErrorStatus.BAD_GATEWAY: // Bad Gateway
        break;
      case HttpErrorStatus.SERVICE_UNAVAILABLE:
        // Service Unavailable
        break;
      case HttpErrorStatus.GATEWAY_TIMEOUT:
        // Gateway Timeout
        break;
    }
    return false;
  }

}
