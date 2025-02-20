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
import { ReactiveFormsModule } from '@angular/forms';
import { BackModule } from './back/back.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SingInComponent,
    NavbarComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BackModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
