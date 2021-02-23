import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import * as UserActions from './user.actions';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }

  login(email: String, password: String): Observable<boolean> {
    return this.http.post<AuthResponseData>(
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + environment.firebasePublicKey,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe( map(user => {

      console.log("user:");
      console.log(user)
      this.userToReduxStore(user);
      this.userToStorage(user);
      return true;
    }));
  }

  signin(email: String, password: String): Observable<boolean> {
    return this.http.post<AuthResponseData>(
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + environment.firebasePublicKey,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe( map(user => {

      console.log("user:");
      console.log(user)
      this.userToReduxStore(user);
      this.userToStorage(user);
      return true;
    }));
  }

  autoLogin() {
    var user = localStorage.getItem("user");
    if (user) {
      var parsedUser: User = <User> JSON.parse(user);
      this.store.dispatch(new UserActions.Login({
        userId: parsedUser.id!,
        email: parsedUser.email!,
        token: parsedUser.token!,
        expirationDate: parsedUser.expirationDate!,
      }))
    }
  }

  logOut() {
    this.store.dispatch(new UserActions.Logout());
    localStorage.removeItem("user");
  }

  userToStorage(user: AuthResponseData) {
    localStorage.setItem("user", JSON.stringify({
      id: user.localId,
      email: user.email,
      token: user.idToken,
      refreshToken: user.refreshToken,
      expirationDate: new Date(new Date().getTime() + +user.expiresIn * 1000),
    }));
  }

  userToReduxStore(user: AuthResponseData) {
    this.store.dispatch(new UserActions.Login(
      {
        email: user.email,
        userId: user.localId,
        token: user.idToken,
        expirationDate: new Date(new Date().getTime() + +user.expiresIn * 1000),
      }
    ));

  }

}
