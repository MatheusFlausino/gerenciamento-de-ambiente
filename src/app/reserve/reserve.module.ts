import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MdInputModule, MdSelectModule, MdDatepickerModule, MdCheckboxModule, MdTabsModule} from '@angular/material';

import { ReserveComponent } from './reserve.component';
import { ReserveService } from './reserve.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdSelectModule,
    MdInputModule,
    MdDatepickerModule,
    MdCheckboxModule,
    MdTabsModule
  ],
  declarations: [
  	ReserveComponent
  ],
  providers: [ReserveService]
})
export class ReserveModule { }
