import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { Geolocation, Position } from '@capacitor/geolocation';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit {
  private map!: L.Map;
  private loc!: Position;
  private token: string = "";
  
  private initMap(): void {
    // init map
    this.map = L.map('map').setView([ 44.80670607908347, -0.6051345163003082 ], 15)
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    setTimeout(() => { this.map.invalidateSize()}, 100);
  }

  constructor(private router: Router) { }

  async getCurrentPosition() {
    // ask permision for geolocation
    this.loc = (await Geolocation.getCurrentPosition());
    let marker = L.marker([this.loc.coords.latitude, this.loc.coords.longitude]).addTo(this.map).bindPopup("This is me");
    marker.getElement()!.style.filter = "hue-rotate(90deg)";
    this.map.setView([this.loc.coords.latitude, this.loc.coords.longitude], 15);
  }
  // execute this function after loading the page
  ngAfterViewInit(): void {
    this.initMap();
    this.Init()
    this.Init2()
    this.getCurrentPosition();
  }
  Init() {
    // get token from local storage
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.token = JSON.parse(token).token;
    }
    // fetch all caches and add on the map
    fetch("http://localhost:3000/caches", {
      headers: { Authentication: 'Bearer ' + this.token}
    })
    .then(res => res.json())
    .then(data => data.forEach((element:any) => {
      let marker = L.marker([element.latitude, element.longitude], 
        {icon: L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
          className: element.difficulty,
          iconSize: [24,36],
          iconAnchor: [12,36]
        })}).addTo(this.map);
      this.add_popup(marker, element);
      if (element.difficulty == "Easy") {
        marker.getElement()!.style.filter = "hue-rotate(275deg)";
      }
      else if (element.difficulty == "Normal") {
        marker.getElement()!.style.filter = "hue-rotate(170deg)";
      }
      else if (element.difficulty == "Hard") {
        marker.getElement()!.style.filter = "hue-rotate(130deg)";
      }
      else if (element.difficulty == "Hell") {
        marker.getElement()!.style.filter = "hue-rotate(10deg) invert(100%)";
        marker.getElement()!.style.animation = "hell 1s linear infinite";
      }
      
    }))
  }
  
  Init2() {
    // function add a popup to add cache when mouse event is trigered 
    var popup = L.popup();
    const onMapClick = (e: L.LeafletMouseEvent) => {
      const div = document.createElement("div");
      const btn = document.createElement("button");
      btn.innerHTML = "ADD CACHE";
      btn.style.borderRadius = "5px";
      btn.style.background = "green";
      btn.style.width = "110px";
      btn.style.height = "40px";
      btn.style.color = "white";
      btn.style.fontWeight = "900";
      btn.style.fontFamily = "'Montserrat', sans-serif";
      btn.style.cursor = "pointer";
      div.appendChild(btn);
      popup
        .setLatLng(e.latlng)
        .setContent(div)
        .openOn(this.map);

        
      btn.addEventListener("click", () => {
        this.addCache(e);
      });
    }

    this.map.on('click', onMapClick);
  }

  add_popup(marker: any, element: any) {
    const div = document.createElement("div");
    const p = document.createElement("h4");
    const lk = document.createElement("a");
    div.id = element._id;
    div.style.position = "float";
    p.innerHTML = element.title;
    lk.innerHTML = "see more...";
    lk.style.fontWeight = "500";
    lk.style.color = "black";
    lk.href = "/cacheinfo?id=" + div.id; 
    div.appendChild(p);
    div.appendChild(lk);
    marker.bindPopup(div);
  }

  // method when add cache send coordinates in the link
  private addCache(e: L.LeafletMouseEvent): void {
    this.router.navigate(['/cacheform'], { queryParams: { latitude: e.latlng.lat,
    longitude: e.latlng.lng } });
  }
}


