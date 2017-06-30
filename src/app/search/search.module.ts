import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import {MdInputModule, MdSelectModule, MdDatepickerModule, MdAutocompleteModule, MdChipsModule} from '@angular/material';

import { SearchComponent } from './search.component';
import { SearchCalendarComponent } from './search-calendar/search-calendar.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchRoutingModule } from './search.routing.module';

import { SearchService } from './search.service';


@NgModule({
  imports: [
    CommonModule,
  //  SearchRoutingModule,
    FormsModule,
    MdInputModule,
    MdSelectModule,
    MdDatepickerModule,
    MdAutocompleteModule,
    MdChipsModule
  ],
  declarations: [
    SearchComponent,
    SearchCalendarComponent,
    SearchListComponent
  ],
  providers: [SearchService]
})
export class SearchModule { }