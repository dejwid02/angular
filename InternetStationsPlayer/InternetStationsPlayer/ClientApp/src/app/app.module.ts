/// <reference path="../model/station.ts" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './group/group.component';
import { StationsComponent } from './stations/stations.component';
import { StationDetailsComponent } from './station-details/station-details.component';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    GroupsComponent,
        FetchDataComponent,
        GroupComponent,
        StationsComponent,
        StationDetailsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
        { path: '', component: HomeComponent, pathMatch: 'full' },
        { path: 'groups/:id', component: GroupComponent },
        { path: 'groups', component: GroupsComponent },
        { path: 'stations/:id', component: StationDetailsComponent },
        { path: 'stations', component: StationsComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
    ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
