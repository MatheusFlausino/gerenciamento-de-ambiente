import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MdInputModule, MdSelectModule, MdDatepickerModule} from '@angular/material';

import { ReserveComponent } from './reserve.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdSelectModule,
    MdInputModule,
    MdDatepickerModule
  ],
  declarations: [
  	ReserveComponent
  ]
})
export class ReserveModule { }
