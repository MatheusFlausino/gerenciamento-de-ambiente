import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private user = [] ;
  constructor(){
    this.user = [
     {
       first_name : 'Fulano01',
       last_name  : 'Silva',
       position   : 'Professor',
       login      : {
                    user   : 'matheusflausino',
                    pass   : 'flausino' 
                  },
       permition  : '2',
       department : 'DACOMP',
       token_number:'56 FF A4 99'
     } 
    ];
  };

  getUser(){
    return this.user[0];
  };
}
