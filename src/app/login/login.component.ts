import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private usuario: User = new User();

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
  }

  onSubmit(form){
    this.usuario.user = form.value.user;
    this.usuario.pass = form.value.pass;
    //console.log(this.usuario);    
    this.authService.loginAuth(this.usuario);
  }
}
