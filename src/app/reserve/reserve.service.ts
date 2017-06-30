import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReserveService {
  isDev:boolean;

  constructor(private http:Http) {
    //this.isDev = true; // Change to false before deployment
    this.isDev = false;
  }

  getRoomEnable(day, hour_in, hour_out){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var ep = this.prepEndpoint(`/api/room/enable/${day}/${hour_in}/${hour_out}`);
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }

  postEventRoom(send){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var ep = this.prepEndpoint('/api/room/update/event');
    return this.http.post(ep, send, {headers: headers})
      .map(res => res.json());
  }

  postEventUser(send){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var ep = this.prepEndpoint('/api/user/update/event');
    return this.http.post(ep, send, {headers: headers})
      .map(res => res.json());
  }

  prepEndpoint(ep){
    if(this.isDev){
      console.log('In Dev: Address is: ' + ep);
      return ep;
    } else {
      console.log('In Prod:  Address is: ' + ep);
      return ep;
    }
  }


}
