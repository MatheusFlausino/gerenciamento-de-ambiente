import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable()

export class AuthService {
  private userAuth: boolean = false;
  showNav = new EventEmitter<boolean>();


  constructor(private router:Router) {

   }
  
  loginAuth(user: User){
    if(user.user == 'm' && user.pass == 'f'){
      this.userAuth = true; 
      this.showNav.emit(true);
      this.router.navigate(['/']);     
    }else{
      this.showNav.emit(false);
      this.userAuth = false;      
    }
  }
}
