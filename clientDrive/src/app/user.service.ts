import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse  } from '@angular/common/http';
import { Iuser} from './iuser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {environment} from '../environments/environment';
// @ts-ignore
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public islog!: boolean;
  messageChange : Subject<string> = new Subject<string>();
  loaderChange : Subject<boolean> = new Subject<boolean>();

  constructor(public http: HttpClient, private router: Router) {
      alertify.set('notifier', 'delay', 2);
     }

  logout() {
    return this.http.get(environment.serverUrl + "/user/logout", 
                  {withCredentials: true ,reportProgress: true});
  }

  loginWithServer(user : Iuser, afterLoginUrl : string) {
    this.http.post(environment.serverUrl + "/user/login",
                   user, {withCredentials: true ,reportProgress: true})
    .subscribe(
      (res) => {
        alertify.success("login success ");
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', user.name);
        this.router.navigate([afterLoginUrl]);
        this.loaderChange.next(false);
      },
      (err) => {
        if (err.status == 0) {
          alertify.error("server error");
      } else {
          this.messageChange.next(err.error._message);
        }

        this.loaderChange.next(false);
      }
    );
  }

  register(user : Iuser) {
    return this.http.post(environment.serverUrl + "/user/register", 
                  user, {withCredentials: true ,reportProgress: true});
  }
}
