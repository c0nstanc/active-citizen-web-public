import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { LoggingService } from '../../services/logging/logging.service';
import { retryWithBackoff } from '../../function/retry-with-backoff.function';
import { HttpErrorHandling } from './http-error-handling.abstract';


@Injectable()
export class HttpErrorInterceptor extends HttpErrorHandling implements HttpInterceptor {

  constructor(
    protected loggingService: LoggingService,
  ) {
    super(loggingService);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(
      (error: HttpErrorResponse) => {
        return this.handleError(error);
      }), retryWithBackoff(1000));
  }

}
