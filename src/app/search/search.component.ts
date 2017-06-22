import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
    private classBlock = [];
    private blockAux = [];
    private blockClass;
    //AutoComplete
    private chipNames = [];
    private names = [
                      'Matheus Flausino', 
                      'Lucas Silva', 
                      'Nicholas Roder', 
                      'Andre Poletto', 
                      'Guilherme Gatto'
                    ];
    nameCtrl: FormControl;
    filteredName: any;
    //DatePicker
    private startDate = new Date();
    private minDate = new Date();
    myFilter = (datePicker: Date) => datePicker.getDay() > 0 && datePicker.getFullYear() <= 2017;

    constructor(){
      this.classBlock = [
        {
          block :"Bloco A",
          classes:
            [ 
              {number: "022", responsible: ["Eu", "você", "nos"], type: "computador", permission_room: 4},
              {number: "023", responsible: ["Eu", "você", "nos"], type: "computador", permission_room: 2},
              {number: "024", responsible: ["Eu", "você", "nos"], type: "computador", permission_room: 3},
              {number: "025", responsible: ["Eu", "você", "nos"], type: "computador", permission_room: 1},
              {number: "026", responsible: ["Eu", "você", "nos"], type: "computador", permission_room: 0}
            ]
        },
        {
          block : "Bloco G",
          classes: 
            [
              {number: "023", responsible: ["Eu", "você", "nos"], type: "computador", permission_room: 4},
              {number: "023", responsible: ["Eu", "você", "nos"], type: "computador", permission_room: 4},
              {number: "023", responsible: ["Eu", "você", "nos"], type: "computador", permission_room: 4},            
            ],
        },
        {    
          block :"Bloco H",
          classes:
            [
              {number: "023", responsible: ["Eu", "você", "nos"], type: "computador", permission_room: 4},
              {number: "023", responsible: ["Eu", "você", "nos"], type: "computador", permission_room: 4},
              {number: "023", responsible: ["Eu", "você", "nos"], type: "computador", permission_room: 4},
              {number: "023", responsible: ["Eu", "você", "nos"], type: "computador", permission_room: 4},            
            ]
        }
      ];
    };

    ngOnInit() {
      this.nameCtrl = new FormControl();
      this.filteredName = this.nameCtrl.valueChanges
                .startWith(null)
                .map(name => this.filterName(name));
    }

    filterName(val: string) {
      return val ? this.names.filter(s => new RegExp(`^${val}`, 'gi').test(s))
                : this.names;
    }

    onSelect(blockId) {
      this.blockAux = this.classBlock.filter((item)=> item.block == blockId);
      this.blockClass = this.blockAux[0].classes;      
    }

    onSubmitSearch(form){
      console.log(form);
      var dayWeek = form.value.dateSelected.getTime() - form.value.dateSelected.getDay()*86400000;
      var arrayDate = [];
      for (var i = 0; i < 7; i++) {
        arrayDate[i] = new Date(dayWeek+86400000*i);
      }
      console.log(arrayDate);
    }

    onSubmitReserve(form){
      console.log(form);
    }
    onChip(name){
      this.chipNames[this.chipNames.length] = name.value;
    }

    setClasses(classes){
      this.classBlock = classes;
    }
}