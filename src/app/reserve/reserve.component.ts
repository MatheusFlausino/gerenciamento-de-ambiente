import { Component, OnInit } from '@angular/core';
import { ReserveService } from './reserve.service';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  private modalReserva;

  private typeClass = ['Laboratório','Teorica'];
  private colors = ["red darken-1","red darken-2","red darken-3","red darken-4","red accent-1","red accent-2","red accent-3","red accent-4","purple darken-1","purple darken-2","purple darken-3","purple darken-4","purple accent-1","purple accent-2","purple accent-3","purple accent-4","teal darken-1","teal darken-2","teal darken-3","teal darken-4","teal accent-1","teal accent-2","teal accent-3","teal accent-4","indigo darken-1","indigo darken-2","indigo darken-3","indigo darken-4","indigo accent-1","indigo accent-2","indigo accent-3","indigo accent-4","amber darken-1","amber darken-2","amber darken-3","amber darken-4","amber accent-1","amber accent-2","amber accent-3","amber accent-4","deep-orange darken-1","deep-orange darken-2","deep-orange darken-3","deep-orange darken-4","deep-orange accent-1","deep-orange accent-2","deep-orange accent-3","deep-orange accent-4","brown darken-1","brown darken-2","brown darken-3","brown darken-4","lime accent-1","lime accent-2","lime accent-3","lime accent-4"];

  private allRooms = [];
  private rooms = [];
  private selectedType = '';
  private days = [];
  private event = [];
  private send = {
    block : '',
    username : '',
    room : '',
    event : []
  };

  //DatePicker
  private startDate = new Date();
  private minDate = new Date();
  myFilter = (datePicker: Date) => datePicker.getDay() > 0 && datePicker.getFullYear() <= 2017;

  constructor(private service : ReserveService) { }

  ngOnInit() {
  }

  onSubmit(form, tab){
    let color = this.getRandomMeal(this.colors);
    let un = form.value.group.split("-");
    let user = JSON.parse(localStorage.getItem('user'));
    this.send.block = un[0];
    this.send.room = un[1];
    this.send.username = user.username;
    console.log(form);
//    console.log(tab.selectedIndex);
    this.event = [{
      token: user.token,
      duration: this.getDuration(form.value.hourIn, form.value.hourOut),
      date : form.value.dateSelected,
      time_in : form.value.hourIn,
      time_out : form.value.hourOut,
      description : form.value.title,
      color : color
    }];
    if(tab.selectedIndex){
      if(form.value.repeatMain == 0){
        if(form.value.dayDom && form.value.dayDom != "" ) this.days.push('0');
        if(form.value.daySeg && form.value.daySeg != "" ) this.days.push('1');
        if(form.value.dayTer && form.value.dayTer != "" ) this.days.push('2');
        if(form.value.dayQua && form.value.dayQua != "" ) this.days.push('3');
        if(form.value.dayQui && form.value.dayQui != "" ) this.days.push('4');
        if(form.value.daySex && form.value.daySex != "" ) this.days.push('5');
        if(form.value.daySab && form.value.daySab != "") this.days.push('6');

        this.repeatDay(this.event, form.value.dateRepeatIn, form.value.dateRepeatOut, this.days)

      }else if(form.value.repeatMain == 1)
        this.repeatWeek(this.event, form.value.dateRepeatIn, form.value.dateRepeatOut, form.value.repeat)
      else if(form.value.repeatMain == 2)
        this.repeatMonth(this.event, form.value.dateRepeatIn, form.value.dateRepeatOut, form.value.repeat)
    }else{
        this.send.event = this.event;      
        this.service.postEventRoom(this.send)
                      .subscribe( (item) => {
                              console.log(item);
                            }, err => {
                              console.log(err);
                              return false;
                            } );

        this.service.postEventUser(this.send)
                      .subscribe( (item) => {
                              console.log(item);
                            }, err => {
                              console.log(err);
                              return false;
                            } );
    }
    
  }

  repeatDay(event, dayIn, dayOut, repeat){
    
    for (let i of repeat){
      var day = dayIn.getTime() + (i - dayIn.getDay())*86400000;
      if(new Date(day).getTime() < dayIn.getTime())
        day = new Date(day).getTime() + ( 7*24*60*60*1000 );
      while(new Date(day).getTime() <= dayOut.getTime()){
        event[0].date = dateFormat(day,"dd-mm-yyyy");
        event.color = this.getRandomMeal(this.colors);
        this.send.event = event;
        this.service.postEventRoom(this.send)
                      .subscribe( (item) => {
                              console.log(item);
                            }, err => {
                              console.log(err);
                              return false;
                            } );

        this.service.postEventUser(this.send)
                      .subscribe( (item) => {
                              console.log(item);
                            }, err => {
                              console.log(err);
                              return false;
                            } );
        day = new Date(day).getTime() + ( 7*24*60*60*1000 );
      }
    }

  }
  repeatWeek(event, dayIn, dayOut, repeat){
    var day = event.date;
    if (day.getTime() < dayIn.getTime())
      day = dayIn;
    while(day.getTime() <= dayOut.getTime()){
      event[0].date = dateFormat(day,"dd-mm-yyyy");
      event.color = this.getRandomMeal(this.colors);      
      this.send.event = event;
      this.service.postEventRoom(this.send)
                    .subscribe( (item) => {
                            console.log(item);
                          }, err => {
                            console.log(err);
                            return false;
                          } );

      this.service.postEventUser(this.send)
                    .subscribe( (item) => {
                            console.log(item);
                          }, err => {
                            console.log(err);
                            return false;
                          } );
      day = new Date(day.getTime() + ( repeat*7*24*60*60*1000 ));
    }
  }
  repeatMonth(event, dayIn, dayOut, repeat){
    var day = event.date;    
    if (day.getTime() < dayIn.getTime())
      day = dayIn;
    while(day.getTime() <= dayOut.getTime()){
      event[0].date = dateFormat(day,"dd-mm-yyyy");
      event.color = this.getRandomMeal(this.colors);      
      this.send.event = event;
      this.service.postEventRoom(this.send)
                    .subscribe( (item) => {
                            console.log(item);
                          }, err => {
                            console.log(err);
                            return false;
                          } );

      this.service.postEventUser(this.send)
                    .subscribe( (item) => {
                            console.log(item);
                          }, err => {
                            console.log(err);
                            return false;
                          } );
      day.setMonth(day.getMonth()+repeat);
    }
  }
  onClick(c){
    console.log(c);
  }

  onTab(form){
    //console.log(form);    
  }

  onSelect(select){
    if(select!= '')
      this.rooms = this.allRooms.filter((item) => item.type == select);
    else
      this.rooms = this.allRooms;
  }

  freeRoom(day, hour_in, hour_out){
    console.log(this.getDuration(hour_in, hour_out));
    if(day && hour_in && hour_out)
      this.service.getRoomEnable( dateFormat(day, "dd-mm-yyyy"), hour_in, hour_out)
            .subscribe( (item) => {
                if(item.success)
                  this.allRooms = item.room;
                  if(this.selectedType != '')
                    this.rooms = this.allRooms.filter((item) => item.type == this.selectedType);
                  else
                    this.rooms = this.allRooms;
              }, err => {
                console.log(err);
                return false;
              } );
  }

  getDuration(horaInicio, horaFim){ 
    let horaIni = horaInicio.split(':'); 
    let horaSom = horaFim.split(':');
    let horaI = new Date(0);
    let horaF = new Date(0);
    horaI.setHours(parseInt(horaIni[0], 10));
    horaI.setMinutes(parseInt(horaIni[1], 10));
    horaF.setHours(parseInt(horaSom[0], 10));
    horaF.setMinutes(parseInt(horaSom[1], 10));
    /*let horasTotal = parseInt(horaIni[0], 10) - parseInt(horaSom[0], 10); 
    let minutosTotal = parseInt(horaIni[1], 10) - parseInt(horaSom[1], 10); 

    if(minutosTotal >= 60){ minutosTotal -= 60; horasTotal += 1 }

    let newDate = new Date(0);
    newDate.setHours(horasTotal);
    newDate.setMinutes(minutosTotal);

    let resto = newDate.getTime()/(50*60*1000);
    */
    //let horaFinal = completaZeroEsquerda(horasTotal) + ":" + completaZeroEsquerda(minutosTotal);
    let resto = (horaF.getTime() - horaI.getTime())/(50*60*1000); 
    return resto; 
  }

  // Get random index between 0 and the amount of meal sent as parameter
  private getRandomMeal(selectedColors) {
    let randomIndex = Math.floor((Math.random() * selectedColors.length) );
    return selectedColors[randomIndex];
  }
}
