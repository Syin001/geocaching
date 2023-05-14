import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cacheform',
  templateUrl: './cacheform.component.html',
  styleUrls: ['./cacheform.component.css']
})
export class CacheformComponent implements OnInit{
  angForm!: FormGroup;
  submitted = false;
  token: string = "";
  coord!: any; 
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get longitude and latitude from parameters in the link
    this.route.queryParams.subscribe(params => {
      this.coord = [params["latitude"], params["longitude"]]; 
    })
    //create a form
    this.angForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      latitude: [this.coord[0], Validators.required ],
      longitude: [this.coord[1], Validators.required ],
      difficulty: ['', Validators.required],
    });
    // get the token stored
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.token = JSON.parse(token).token;
    }
  }

  get title() {
    return this.angForm.get('title');
  }

  get description() {
    return this.angForm.get('description');
  }

  get difficulty() {
    return this.angForm.get('difficulty');
  }

  get latitude() {
    return this.angForm.get('latitude');
  }

  get longitude() {
    return this.angForm.get('longitude');
  }

  // method called when button submit is clicked
  onSubmit() {
    this.submitted = true;
    let value = JSON.stringify(this.angForm.value);
    console.log(value);
    // stop here if form is invalid
    if (this.angForm.invalid) {
        return;
    }
    
    fetch("http://localhost:3000/caches", {
      method: "POST",
      body: value,
      headers: {"Content-type":"application/json; charset=UTF-8",
      Authentication: 'Bearer ' + this.token}
    })
    .then(res => console.log(res))

    this.router.navigate(['/home']);
  }
}