import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cacheinfo',
  templateUrl: './cacheinfo.component.html',
  styleUrls: ['./cacheinfo.component.css']
})
export class CacheinfoComponent implements OnInit {
  submitted = false;
  angForm!: FormGroup;
  token = "";
  id!: string;
  value!: any;
  modify = 0;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    //get token from local storage
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.token = JSON.parse(token).token;
    }
    //get the id of the cache
    this.route.queryParams
      .subscribe(params => {
        this.id = params['id'];
      })
    this.initForm();
    this.getvalue();
  }

  async getvalue () {
    // fetch the information from the cache 
    await fetch("http://localhost:3000/caches/" + this.id, {
      method: "GET",
      headers: {"Content-type":"application/json; charset=UTF-8",
      Authentication: 'Bearer ' + this.token}
    })
    .then(res => res.json())
    .then(data => {
      this.value = data.caches;
      this.modify = data.modifiable;
      console.log(this.modify);
      this.updateForm();
    })
  }

  initForm() {
    // create a form
    this.angForm = this.fb.group({
      title: [{ value: '', disabled: this.isDisabled() }, [Validators.required]],
      description: [{ value: '', disabled: this.isDisabled() }],
      latitude: [{ value: '', disabled: this.isDisabled() }, Validators.required],
      longitude: [{ value: '', disabled: this.isDisabled() }, Validators.required],
      difficulty: [{ value: '', disabled: this.isDisabled() }, Validators.required],
    });
  }

  updateForm() {
    // update the form with cache information
    this.angForm = this.fb.group({
      title: [{ value: this.value.title, disabled: this.isDisabled() }, [Validators.required]],
      description: [{ value: this.value.description, disabled: this.isDisabled() }],
      latitude: [{ value: this.value.latitude, disabled: this.isDisabled() }, Validators.required],
      longitude: [{ value: this.value.longitude, disabled: this.isDisabled() }, Validators.required],
      difficulty: [{ value: this.value.difficulty, disabled: this.isDisabled() }, Validators.required],
    });
  }

  isDisabled() {
    return this.modify != 1;
  }

  get gmodify() {
    return this.modify;
  }

  validate() {
    this.modify = -1;
    // if button is validated add +1 to the score
    fetch("http://localhost:3000/caches/validate/" + this.id, {
      method: "GET",
      headers: {"Content-type":"application/json; charset=UTF-8",
      Authentication: 'Bearer ' + this.token}
    })
    .then(res => console.log(res))
  }

  onSubmit() {
    // button submit to modify information if it's the user caches
    this.submitted = true;
    let value = JSON.stringify(this.angForm.value);
    console.log(value);
    // stop here if form is invalid
    if (this.angForm.invalid) {
        return;
    }

    fetch("http://localhost:3000/caches/" + this.id, {
      method: "PATCH",
      body: value,
      headers: {"Content-type":"application/json; charset=UTF-8",
      Authentication: 'Bearer ' + this.token}
    })
    .then(res => console.log(res))
    this.router.navigate(['/home']);
  }
}
