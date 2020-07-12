import { retryWhen, mergeMap, delay } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorStatus } from 'src/app/core/http/model/error/http-error-status.enum';


const getRetryErrorMessage = (maxRetry: number) => `Tried to load Resource over XHR for ${maxRetry} times without success. Giving up.`;
const getErrorMessage = () => `Will not try again to reload over XHR.`;
const DEFAULT_MAX_RETRIES = 1;
const DEFAULT_BACKOFF = 1000;

export function retryWithBackoff(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES, backoffMs = DEFAULT_BACKOFF) {
  let retries = maxRetry;

  return (src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        mergeMap(error => {
          if (error.status === HttpErrorStatus.GATEWAY_TIMEOUT) {
            if ((retries-- > 0)) {
              const backoffTime = delayMs + (maxRetry - retries) * backoffMs;
              return of(error).pipe(delay(backoffTime));
            }
            if (maxRetry !== 0) {
              return throwError(getRetryErrorMessage(maxRetry));
            }
            return throwError(getErrorMessage());
          }
          return throwError(error);
        }))));
}
