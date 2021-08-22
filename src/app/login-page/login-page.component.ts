import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/userService/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  email: string;
  password: string;

  submited = false;
  pas_err = false;
  registerForm: FormGroup;
  login_error: boolean = false;

  constructor(
    private user_service: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get help() {
    return this.registerForm.controls;
  }

  onSubmit = () => {
    this.user_service
      .userLogin({
        email: this.email,
        password: this.password,
      })
      .subscribe(
        (res: user) => {
          console.log('ssss', res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user_id', res.user._id);
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.login_error = true;
          console.log('error whilr loging in', err);
        }
      );
  };

  signIn = () => {
    this.submited = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.user_service
      .signIn({
        name: this.registerForm.value.firstName,
        lastname: this.registerForm.value.lasName,
        email: this.registerForm.value.email,
        mobile: this.registerForm.value.mobile,
        password: this.registerForm.value.password,
      })
      .subscribe(
        (res) => {
          this.email = this.registerForm.value.email;
          this.password = this.registerForm.value.password;
          this.onSubmit();
        },
        (err) => {
          console.log('error in signing ', err);
        }
      );
  };
}
