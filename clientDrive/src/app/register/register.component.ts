import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iuser} from '../iuser';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
// @ts-ignore
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loader: boolean = false;
  registerForm!: FormGroup;
  message!: string;
  returnUrl!: string;

  constructor(public userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,) { }

  ngOnInit(): void {
    alertify.set('notifier', 'delay', 2);
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      verifyPass: ['', Validators.required]
    });
    this.returnUrl = '/login';
  }

  get form() { return this.registerForm.controls; }

  register() {

  if (this.registerForm.get('password')?.invalid && 
      this.registerForm.get('password')?.errors?.['minlength']) {
          this.message = "The password must contain at least 4 characters";
  } 
  else if (this.registerForm.invalid) {
    this.message = "invalid details";
  
  } else if (this.form['password'].value != this.form['verifyPass'].value) {
    this.message = "please make sure your passwords match";
  
  } 
    else {
      this.loader = true;
      let userDetails : Iuser= { name: this.form['name'].value, password: this.form['password'].value};
      this.userService.register(userDetails)
      .subscribe({
      next:(res) => {
        this.loader = false;
        alertify.success("register success ");
        this.router.navigate([this.returnUrl]);
      },
      error:(err) => {
        this.loader = false;
        if (err.status == 0 || err.status == 500) {
          alertify.error("server error!");
      } else {
          this.message = err.error._message;
        }
      }
    });;
    }
  }
}
