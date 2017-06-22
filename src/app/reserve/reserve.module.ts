import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MdInputModule, MdSelectModule, MdDatepickerModule, MdCheckboxModule} from '@angular/material';

import { ReserveComponent } from './reserve.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdSelectModule,
    MdInputModule,
    MdDatepickerModule,
    MdCheckboxModule
  ],
  declarations: [
  	ReserveComponent
  ]
})
export class ReserveModule { }
