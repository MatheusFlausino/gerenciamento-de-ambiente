import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserReserveComponent } from './user/user-reserve/user-reserve.component';
import { UserPerfilComponent } from './user/user-perfil/user-perfil.component';
import { SearchCalendarComponent } from './search/search-calendar/search-calendar.component';
import { SearchListComponent } from './search/search-list/search-list.component';
import { ReserveComponent } from './reserve/reserve.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: 'reserva', component: ReserveComponent },
    { path: 'reserva/edit/:id', component: ReserveComponent },
    { path: 'login', component: LoginComponent },
    { path: 'pesquisa', loadChildren: 'app/search/search.module#SearchModule'},
    { path: 'perfil', component: UserPerfilComponent },
//    { path: 'configurar', component: UserPerfilComponent },
//    { path: 'gerenciar', component: CursoNaoEncontradoComponent },
//    { path: 'relatorio', component: CursoNaoEncontradoComponent },
//    { path: 'relatorio/:id', component: CursoNaoEncontradoComponent },
    { path: 'home', component: UserReserveComponent },
    { path: '', component: UserReserveComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}