import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ConfigService} from '../config.service';
import * as sha1 from 'js-sha1';
import {catchError, retry} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reactiveForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private configService: ConfigService, private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }



  createForm() {
    this.reactiveForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.configService.sendLoginData(this.reactiveForm.value.email, sha1(this.reactiveForm.value.password)).subscribe(
        (response) => this.loginSuccessful(response),
      error => this.errorMessage = 'Het email of wachtwoord is onjuist.');
  }

  private loginSuccessful(response) {
    this.router.navigate(['home']);
  }

  get name() {
    return this.reactiveForm.get('name');
  }

  get email() {
    return this.reactiveForm.get('email');
  }

  get password() {
    return this.reactiveForm.get('password');
  }
}
