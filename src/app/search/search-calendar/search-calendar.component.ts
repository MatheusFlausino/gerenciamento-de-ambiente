import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-search-calendar',
  templateUrl: './search-calendar.component.html',
  styleUrls: ['./search-calendar.component.css']
})
export class SearchCalendarComponent implements OnInit {
  private hours : Array<String> = [];
  private allEvents = [];
  private nextEvents = [];
  private prevEvents = [];
  private events = [];
  private day: Date;

  constructor(private service : SearchService) {
    //Hours class
    this.hours = ["07:30", "08:20", "09:10", "10:00", "10:20", "11:10", "12:00", "13:00", "13:50", "14:40", "15:30", "15:50", "16:40", "17:30", "17:50", "18:40", "19:30", "20:20", "21:10", "21:20", "22:10", "23:00"];
    this.events = this.getEvents(new Date());
  }

  ngOnInit() {
  }

  onSubmitSearch(form){
    let classSelected = form.value.classSelected;
    let blockSelected = form.value.blockSelected;
    let dateSelected = form.value.dateSelected;

    this.service.consultEvents( blockSelected, classSelected)
              .subscribe( (item) => {
                  this.allEvents = item.events;
                  this.onSearch(dateSelected); //Só executa se encontrar                  
                }, err => {
                  console.log(err);
                  return false;
                } );
  }

  onSearch(date : Date){
    this.day = date;
    this.events = this.getEvents(this.day);
    
     // 1 week ( 7 *24 * 60 * 60 * 1000)
    //this.prevEvents = this.getEvents(new Date(this.day.getTime() - ( 7*24*60*60*1000 ) ));
    //this.nextEvents = this.getEvents(new Date(this.day.getTime() + ( 7*24*60*60*1000 ) ));
  }

  onPrev(){
    this.day = new Date(this.day.getTime() - ( 7*24*60*60*1000 ) );
    this.events = this.getEvents(this.day);
    //this.prevEvents = this.getEvents(new Date(this.day.getTime() - ( 7*24*60*60*1000 ) ));
    //this.nextEvents = this.getEvents(new Date(this.day.getTime() + ( 7*24*60*60*1000 ) ));
  }

  onNext(){
    this.day = new Date(this.day.getTime() + ( 7*24*60*60*1000 ) );
    this.events = this.getEvents(this.day);
    //this.prevEvents = this.getEvents(new Date(this.day.getTime() - ( 7*24*60*60*1000 ) ));
    //this.nextEvents = this.getEvents(new Date(this.day.getTime() + ( 7*24*60*60*1000 ) ));
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
