import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  checkoutForm;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      passwordrepeat: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(customerData) {
    // Process checkout data here
    this.checkoutForm.reset();

    console.warn('Register gegevens', customerData);
  }
}
