import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { User } from 'src/app/data/schema/user.model';


interface LoginContextInterface {
  username: string;
  password: string;
  token: string;
}

const defaultUser = {
  username: 'User',
  password: '12345',
  token: '12345'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  login(loginContext: LoginContextInterface): Observable<User> {
    if (
      loginContext.username.toUpperCase() === defaultUser.username.toUpperCase() &&
      loginContext.password === defaultUser.password
    ) {
        return of(defaultUser);
    }

    return throwError('authentication.message.wrong-username-or-password');
  }

  logout(): Observable<boolean> {
    return of(false);
  }

  getToken() {
    return this.getToken;
  }
}
