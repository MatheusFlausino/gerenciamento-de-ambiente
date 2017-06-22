import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private user: String;
  
  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
      this.authService.getProfile().subscribe( profile => {
        this.user = profile.user.name;
      }, err => {
        console.log(err);
        return false;
      } );
  }
  
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
