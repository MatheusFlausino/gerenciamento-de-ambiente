import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  isDev:boolean;

  constructor(private http:Http) {
    //this.isDev = true; // Change to false before deployment
    this.isDev = false;
  }


  getBlock(){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var ep = this.prepEndpoint('/api/room');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }

  consultBlock(block){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var ep = this.prepEndpoint(`/api/room/consult/${block}`);
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }

  consultEvents(block, room){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var ep = this.prepEndpoint(`/api/room/events/${block}/${room}`);
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }

  consultEventsDay(block, room, date){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var ep = this.prepEndpoint(`/api/room/events/${block}/${room}/${date}`);
    return this.http.get(ep,{headers: headers})
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
