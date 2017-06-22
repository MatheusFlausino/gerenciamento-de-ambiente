import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReserveComponent } from './user-reserve/user-reserve.component';
import { UserPerfilComponent } from './user-perfil/user-perfil.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserReserveComponent, UserPerfilComponent]
})
export class UserModule { }
