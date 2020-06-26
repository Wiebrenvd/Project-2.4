import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from '../config.service';
import {Router} from '@angular/router';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.configService.register(this.reactiveForm.get('name').value, this.reactiveForm.get('email').value, sha1(this.reactiveForm.get('password').value)).subscribe(
      res => this.registerSuccessful(res),
      error => console.error(error.message));
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

  private registerSuccessful(res: any) {
    localStorage.setItem('jwt', res);
    console.log(localStorage.getItem('jwt'));
    this.router.navigate(['home']);

  }
}
