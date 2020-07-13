import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../../model/url/urls.model';
import { Observable } from 'rxjs';
import { HttpBase } from '../base/http-base.abstract';
import { BusinessErrorHandlingService } from 'src/app/active-citizen/common/service/error-message/business-error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class HttpSessionService extends HttpBase {

  constructor(
    private http: HttpClient,
    protected businessErrorHandlingService: BusinessErrorHandlingService
  ) {
    super(businessErrorHandlingService);
  }

  deleteSession(): Observable<void> {
    return this.http.delete<void>(Urls.Session);
  }
}
