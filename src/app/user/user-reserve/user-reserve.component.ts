import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-reserve',
  templateUrl: './user-reserve.component.html',
  styleUrls: ['./user-reserve.component.css']
})
export class UserReserveComponent implements OnInit {
  private user: any;
  private codEvents = ['fçlakj1931', 'fsaldkjfh'];
  private events = [];
  private today = new Date();

  constructor() { 
    //Exemplo de Evets Date
    this.events = [
        {time_in:"8:20", time_out:"10:00", class:"Bloco A - 023", event_description:"IF64C - Análise de circuitos", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"2", color:"red lighten-2"},
        {time_in:"15:50", time_out:"17:30", class:"Bloco A - 123", event_description:"IF66A - Compiladores", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"2", color:"pink darken-2"}
      ]
  }

  ngOnInit() {
  }

}
