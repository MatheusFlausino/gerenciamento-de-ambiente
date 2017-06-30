import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.css']
})
export class UserPerfilComponent implements OnInit {
  private user = { name:'', position:'', department:'' };
  private hours = [];
  private events = [];
  private allEvents = [];

  constructor(private service : AuthService) {
    this.hours = ["07:30", "08:20", "09:10", "10:00", "10:20", "11:10", "12:00", "13:00", "13:50", "14:40", "15:30", "15:50", "16:40", "17:30", "17:50", "18:40", "19:30", "20:20", "21:10", "21:20", "22:10", "23:00"];
    this.service.getProfile().subscribe( (item) => {
                        console.log(item);
                        this.user = item.user;
                        this.allEvents = item.user.dateEvents;
                        this.events = this.getEvents(new Date());                        
                      }, err => {
                        console.log(err);
                        return false;
                      } );
  }

  ngOnInit() {
  }

    getEvents(date : Date){
    let eventsDate = [];
    let arrayDays = this.daysWeek(date);
    let event;
    console.log(this.allEvents);
    for (var i = 1; i < 7; i++) {
      event = this.allEvents.filter(
              (item) => item.date == arrayDays[i]
            );
      
      eventsDate.push({
        date : arrayDays[i], 
        events : event[0]? event : []
      });
    }

    console.log(eventsDate);
    return eventsDate;
  }
  daysWeek(dateSelect : Date){
      var date;
      var dayWeek = dateSelect.getTime() - dateSelect.getDay()*86400000;
      var arrayDate = [];

      for (var i = 0; i < 7; i++) {
        date = new Date(dayWeek+86400000*i);
        arrayDate[i] = dateFormat(date, "dd-mm-yyyy");
      }    
      return arrayDate;
    }

}
