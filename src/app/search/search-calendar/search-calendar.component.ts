import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-calendar',
  templateUrl: './search-calendar.component.html',
  styleUrls: ['./search-calendar.component.css']
})
export class SearchCalendarComponent implements OnInit {
  private events =[];
  private hours = [];

  constructor() {
          //Hours class
      this.hours = [
        "7:30", "8:20", "9:10", "10:00", "10:20", "11:10", "12:00", "13:00", "13:50", "14:40", "15:30", "15:50", "16:40", "17:30", "17:50", "18:40", "19:30", "20:20", "21:10", "21:20", "22:10", "23:00"
      ]

      //Exemplo de Evets Date
      this.events = [
        {
          date: "12-06-2017",
          events:
            [
              {time_in:"8:20", time_out:"10:00", event_description:"IF64C - Análise de circuitos", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"2", color:"red lighten-2"},
              {time_in:"15:50", time_out:"17:30", event_description:"IF66A - Compiladores", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"2", color:"pink darken-2"}
            ]
        },
        {
          date: "13-06-2017",
          events :
          [
              {time_in:"7:30", time_out:"10:00", event_description:"ET65A - Eletrônica Geral", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"3", color:"purple darken-1"}
          ]
        },
        {
          date: "14-06-2017",
          events : [
              {time_in:"7:30", time_out:"10:00", event_description:"ET65A - Eletrônica Geral", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"3", color:"purple darken-1"},
              {time_in:"10:20", time_out:"12:00", event_description:"ET65A - Eletrônica Geral", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"2", color:"amber darken-4"}            
          ]
        },
        {
          date: "15-06-2017",
          events : [
              {time_in:"15:50", time_out:"17:30", event_description:"IF66A - Compiladores", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"2", color:"pink darken-2"}            
          ]
        },
        {
          date: "16-06-2017",
          events : []
        },
        {
          date: "17-06-2017",
          events : [
              {time_in:"13:00", time_out:"15:30", event_description:"IF66G - Oficina de Integração 1", users_door_unlock:"kas1dj2lk2sa;l96byrvg74b", duration:"3", color:"blue darken-1"}            
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
