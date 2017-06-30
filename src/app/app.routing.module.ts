import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserReserveComponent } from './user/user-reserve/user-reserve.component';
import { UserPerfilComponent } from './user/user-perfil/user-perfil.component';
import { SearchCalendarComponent } from './search/search-calendar/search-calendar.component';
import { SearchListComponent } from './search/search-list/search-list.component';
import { ReserveComponent } from './reserve/reserve.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './services/auth.guard';

const appRoutes: Routes = [
    { path: 'reserva', component: ReserveComponent },
    { path: 'reserva/edit/:id', component: ReserveComponent, canActivate:[AuthGuard]},
    { path: 'login', component: LoginComponent },
    //{ path: 'pesquisa', loadChildren: 'app/search/search.module#SearchModule', canActivate:[AuthGuard]},
    
    { path: 'pesquisa', component: SearchCalendarComponent, canActivate:[AuthGuard]},
    { path: 'pesquisa/lista', component: SearchListComponent , canActivate:[AuthGuard]},
    { path: 'pesquisa/calendario', component: SearchCalendarComponent , canActivate:[AuthGuard]},
    { path: 'pesquisa/lista/:id', component: SearchListComponent , canActivate:[AuthGuard]},
    { path: 'pesquisa/calendario/:id', component: SearchCalendarComponent, canActivate:[AuthGuard] },

    { path: 'perfil', component: UserPerfilComponent, canActivate:[AuthGuard] },
    { path: 'home', component: UserReserveComponent, canActivate:[AuthGuard] },
    { path: '', component: UserReserveComponent, canActivate:[AuthGuard]  }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    providers : [AuthGuard],
    exports: [RouterModule]
})
export class AppRoutingModule {}