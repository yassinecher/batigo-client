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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorModalComponent } from './front/Shared/error-modal/error-modal.component';
import { SuccessModalComponent } from './front/Shared/success-modal/success-modal.component';

import { CommandeComponent } from './back/commande/commande.component';
import { LivraisonComponent } from './back/livraison/livraison.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SingInComponent,
    NavbarComponent,
    FooterComponent,
    ErrorModalComponent,
    SuccessModalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,ReactiveFormsModule,
    FormsModule,HttpClientModule,   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
