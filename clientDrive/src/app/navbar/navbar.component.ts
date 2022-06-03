import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router'; 
// @ts-ignore
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loader: boolean = false;

  constructor(public userService : UserService, private router: Router) {
    alertify.set('notifier', 'delay', 2);
   }

  ngOnInit(): void {
  }

  getName() {
    return localStorage.getItem('token');
  }

  isLogin() : boolean{
    return localStorage.getItem('isLoggedIn') == "true";
  }

  logout() : void {
    this.loader = true;
    this.userService.logout()
    .subscribe({
      next: (res) => {
        this.loader = false;
        localStorage.setItem('isLoggedIn', "false");
        localStorage.removeItem('token');
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        this.loader = false;
        if (err.status == 0) {
          alertify.error("error with logout").dismissOthers();
        } else {
          alertify.error(err.error._message + " with logout").dismissOthers();
        }
      }
  });;
  }
}
