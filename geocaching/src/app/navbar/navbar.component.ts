import { Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  //function that open or close navbar
  toggleMenu = () => {
    let display = document.getElementById("nav");
    if (display) {
      display.dataset['nav'] = display.dataset['nav'] === "true" ? "false" : "true";
    }
  }
}