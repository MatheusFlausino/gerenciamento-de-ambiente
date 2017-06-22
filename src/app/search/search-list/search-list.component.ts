import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  private events = [];

  constructor() {
      //Exemplo de Evets Date
      this.events = [
        {
          date: "12-06-2017",
          events:
            [
              {time_in:"8:20", time_out:"10:00", event_description:"IF64C - Análise de circuitos", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"2", color:"red lighten-2"},
              {time_in:"15:50", time_out:"17:30", event_description:"IF66A - Compiladores", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"2", color:"pink darken-2"},
              {time_in:"15:50", time_out:"17:30", event_description:"IF66A - Compiladores", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"2", color:"pink darken-2"},
              {time_in:"15:50", time_out:"17:30", event_description:"IF66A - Compiladores", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"2", color:"pink darken-2"}
            ]
        }
      ]
   }

  ngOnInit() {
  }
  
  setEvent(event){
    this.events = event;
  }
}
