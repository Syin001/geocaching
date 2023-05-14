import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})

export class ClassementComponent implements OnInit{
  player!: any;
  top10!: any;
  token = "";

  constructor() {}

  ngOnInit(): void {
    // get token from local storage
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.token = JSON.parse(token).token;
    }
    // fetch the players ordered by number of cache validated
    fetch("http://localhost:3000/ranking", {
      method: "GET",
      headers: {"Content-type":"application/json; charset=UTF-8",
      Authentication: 'Bearer ' + this.token}
    })
    .then(res => res.json())
    .then(data => {
      this.player = data.slice(0,3);
      this.top10 = data.slice(3);
    })
  }
}
