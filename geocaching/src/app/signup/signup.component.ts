import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  angForm!: FormGroup;
  submitted = false;
  token: string = "e";
  
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    //create a form
    this.angForm = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required]],
       confpassword: ['', [Validators.required]],
    }, {
      validator: this.ConfirmedValidator('password', 'confpassword'),
    })
  }

  get email() { 
    return this.angForm.get('email');
  }

  get password() { 
    return this.angForm.get('password');
  }

  get confpassword() { 
    return this.angForm.get('confpassword');
  }

  get gtoken() {
    return this.token;
  }
  // submit test when button is clicked
  onSubmit() {
    this.submitted = true;
    let value = JSON.stringify({email: this.angForm.value.email, password: this.angForm.value.password});
    console.log(value);
    // stop here if form is invalid
    if (this.angForm.invalid) {
        return;
    }
    //fetch token and store it in local storage
    fetch("http://localhost:3000/logins", {
      method: "POST",
      body: value,
      headers: {"Content-type":"application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(data => localStorage.setItem('token', JSON.stringify(data)))
    // save account into database
    let token = localStorage.getItem('token');
    console.log(token);
    if (token !== null) {
      this.token = JSON.parse(token).token;
      if (this.token == "") {
        return;
      }
    } else {
      return;
    }

    this.router.navigate(['/home']);
  }
  // check if both password and confpassword match
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}