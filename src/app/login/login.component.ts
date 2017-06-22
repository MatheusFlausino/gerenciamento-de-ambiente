import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if(this.authService.loggedIn())
      this.router.navigate(['/home'], {});
  }

  onLoginSubmit(form) {
    var user = {
      username: form.value.user,
      password: form.value.pass
    };
    console.log('Name: ' + form.value.user + ' password ' + form.value.pass);
    this.authService.authenticateUser(user).subscribe( data => {
      console.log(data);
      if(data.success) {
        console.log("Teste");
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/home'], {});
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
