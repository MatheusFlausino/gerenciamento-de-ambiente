import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchCalendarComponent } from './search-calendar/search-calendar.component';

const searchRoutes: Routes = [
    { path: '', component: SearchComponent, children: [
        { path: '', component: SearchCalendarComponent },
        { path: 'lista', component: SearchListComponent },
        { path: 'calendario', component: SearchCalendarComponent },
        { path: 'lista/:id', component: SearchListComponent },
        { path: 'calendario/:id', component: SearchCalendarComponent }
    ]}   
    //{ path: '**', component: PaginaNaoEncontradaComponent } //, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(searchRoutes)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }
