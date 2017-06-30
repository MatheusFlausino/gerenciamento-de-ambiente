import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  private events = [];
  private day : Date = new Date();
  private allEvents = [];
  private nextEvents = [];
  private prevEvents = [];

  constructor (private service : SearchService) {
      //Exemplo de Evets Date
   }

  ngOnInit() {
  }
  
  onSubmitSearch(form){
    var classSelected = form.value.classSelected;
    var blockSelected = form.value.blockSelected;

    this.service.consultEvents( blockSelected, classSelected)
              .subscribe( (item) => {
                  this.allEvents = item.events;
                  this.onSearch(form.value.dateSelected); //Só executa se encontrar                  
                }, err => {
                  console.log(err);
                  return false;
                } );
  }

  onSearch( date : Date ){
    this.day = date;
    this.events = this.getEvents(this.day);
     // 1 day ( 24 * 60 * 60 * 1000)
    //this.prevEvents = this.getEvents(new Date(this.day.getTime() - ( 24*60*60*1000 ) ));
    //this.nextEvents = this.getEvents(new Date(this.day.getTime() + ( 24*60*60*1000 ) ));
  }

  onPrev(){
    this.day = new Date(this.day.getTime() - ( 24*60*60*1000 ) );
    this.events = this.getEvents(this.day);
     // 1 day ( 24 * 60 * 60 * 1000)
    //this.prevEvents = this.getEvents(new Date(this.day.getTime() - ( 24*60*60*1000 ) ));
    //this.nextEvents = this.getEvents(new Date(this.day.getTime() + ( 24*60*60*1000 ) ));
  }

  onNext(){
    this.day = new Date(this.day.getTime() + ( 24*60*60*1000 ) );
    this.events = this.getEvents(this.day);
     // 1 day ( 24 * 60 * 60 * 1000)
    //this.prevEvents = this.getEvents(new Date(this.day.getTime() - ( 24*60*60*1000 ) ));
    //this.nextEvents = this.getEvents(new Date(this.day.getTime() + ( 24*60*60*1000 ) ));
  }

  getEvents(date : Date){
    var dayFormat = dateFormat(date, "dd-mm-yyyy");
    let event = this.getAllEvents().filter(
              (item) => item.date == dayFormat
            );
    return [{
        date : dayFormat,
        events : event[0]? event : []
      }]
  }

  getAllEvents(){
    return this.allEvents;
  }
}
