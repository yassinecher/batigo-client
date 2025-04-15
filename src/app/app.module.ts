import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './front/Home/home.component';
import { SingInComponent } from './front/Authentication/sing-in/sing-in.component';
import { NavbarComponent } from './front/Shared/navbar/navbar.component';
import { FooterComponent } from './front/Shared/footer/footer.component';
import { DashboardComponent } from './back/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackModule } from './back/back.module';
import { CreateprojetComponent } from './front/Projet/createprojet/createprojet.component';
import { ViewprojetComponent } from './front/Projet/viewprojet/viewprojet.component';
import { UpdateprojetComponent } from './front/Projet/updateprojet/updateprojet.component';
import { Router } from '@angular/router';
import { CreatelivrableComponent } from './front/Livrable/createlivrable/createlivrable.component';
import { ViewlivrableComponent } from './front/Livrable/viewlivrable/viewlivrable.component';
import { UpdatelivrableComponent } from './front/Livrable/updatelivrable/updatelivrable.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PlanificationCalendarComponent } from './front/Livrable/planification-calendar/planification-calendar.component';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SingInComponent,
    NavbarComponent,
    FooterComponent,
    CreateprojetComponent,
    ViewprojetComponent,
    UpdateprojetComponent,
    CreatelivrableComponent,
    ViewlivrableComponent,
    UpdatelivrableComponent,
    PlanificationCalendarComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BackModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    FullCalendarModule,
    NgApexchartsModule
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
