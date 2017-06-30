import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';

import { SearchService } from './search.service';
import { SearchCalendarComponent } from './search-calendar/search-calendar.component';
import { SearchListComponent } from './search-list/search-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
    @Output() onSubmit = new EventEmitter();

    private classBlock = [];
    private blockClass;
    //private classSelected;
    //private blockSelected;
    //private daySelected;

    //DatePicker
    private startDate = new Date();
    private minDate = new Date();
    myFilter = (datePicker: Date) => datePicker.getDay() > 0 && datePicker.getFullYear() <= 2017;

    constructor(private service : SearchService){
      this.service.getBlock().subscribe( room => {
          this.classBlock = room.room;
        }, err => {
          console.log(err);
          return false;
        } );
      
    };

    ngOnInit() {
    }

    onSelect(blockId) {
      var blockAux = this.classBlock.filter((item)=> item.block == blockId);
      this.blockClass = blockAux[0].classes;
    }

    onSubmitSearch(form){
      //this.classSelected = form.value.classSelected;
      //this.blockSelected = form.value.blockSelected;
      //this.daySelected = form.value.dateSelected;
      this.onSubmit.emit(form);
    }
}