import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.css']
})
export class UserPerfilComponent implements OnInit {
  private user: any;
  constructor(app :  AppComponent) {
    this.user = app.getUser();
    console.log(app.getUser());
  }

  ngOnInit() {
  }

}
