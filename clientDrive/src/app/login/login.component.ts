import { Component, OnInit } from '@angular/core';
import {faUser, faKey, faCloud} from '@fortawesome/free-solid-svg-icons';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iuser} from '../iuser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;
  faCloud = faCloud;

  loginForm!: FormGroup;
  message!: string;
  returnUrl!: string;
  loader: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              public userService: UserService) {
    userService.messageChange.subscribe((value)=> {this.message = value;})
    userService.loaderChange.subscribe((value)=> {this.loader = value;})
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/upload';
  }

  // convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }
  
  login() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.message = "invalid details";
        return;
    } else {
      this.loader = true;
      let userDetails : Iuser= { name: this.form['name'].value, password: this.form['password'].value};
      this.userService.loginWithServer(userDetails, this.returnUrl);
    }
  }

  changeMessage(newMessage : string) : void {
   this.message = newMessage ;
  }
}