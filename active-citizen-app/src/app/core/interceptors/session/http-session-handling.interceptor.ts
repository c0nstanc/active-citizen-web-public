import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from '../../http/model/urls/urls.model';
import { SessionManagementService } from '../../service/session/session-management.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private sessionManagementService: SessionManagementService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const url = request.url;
    // Avoid restarting the counter if:
    // - we retrieved the language files
    // - called the session expiry
    // - we are in session counter pause mode
    if (url !== Urls.Session && !url.endsWith('.json') &&
      url !== Urls.Config && this.sessionManagementService.isExpirationCounterActive()) {

      this.sessionManagementService.startExpirationCounter();
    }

    return next.handle(request);
  }
}
