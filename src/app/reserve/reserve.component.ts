import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  private typeClass = [];
  //DatePicker
  private startDate = new Date();
  private minDate = new Date();
  myFilter = (datePicker: Date) => datePicker.getDay() > 0 && datePicker.getFullYear() <= 2017;
  
  constructor() {
    this.typeClass = [
                      'Laboratório',
                      'Teórica',
                      'Sala de Reunião',
                      'RU (kkk)'
                      ]
  }

  ngOnInit() {
  }

}
