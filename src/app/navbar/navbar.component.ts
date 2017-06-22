import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private user: any;
  constructor(app : AppComponent) {
    this.user = app.getUser();
  }

  ngOnInit() {
  }

}
