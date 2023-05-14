import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component_.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  angForm!: FormGroup;
  submitted = false;
  hide = true;
  token: string = '';
  
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    // create a form
    this.angForm = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', Validators.required ],
    });
  }

  get email() { 
    return this.angForm.get('email');
  }

  get password() { 
    return this.angForm.get('password');
  }

  get gtoken() {
    return this.token;
  }
  // when button submit is clicked
  async onSubmit() {
    this.submitted = true;
    let value = JSON.stringify(this.angForm.value);
    console.log(value);
    // stop here if form is invalid
    if (this.angForm.invalid) {
        return;
    }
    //fetch login and store token in local storage
    await fetch("http://localhost:3000/logins", {
      method: "PATCH",
      body: value,
      headers: {"Content-type":"application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(data => localStorage.setItem('token', JSON.stringify(data)))
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.token = JSON.parse(token).token;
      console.log('In login page ', this.token);
      if (this.token == "") {
        return;
      }
    } else {
      return;
    }
    this.router.navigate(['/home']);
  }
}
