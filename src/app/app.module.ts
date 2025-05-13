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
import { VerificationModalComponent } from './Shared/verification-modal/verification-modal.component';
import { ProductsClientComponent } from './front/products-client/products-client.component';
import { LivrableComponent } from './front/livrable/livrable.component';
import { CreatelivrableComponent } from './front/livrable/createlivrable/createlivrable.component';
import { PlanificationCalendarComponent } from './front/livrable/planification-calendar/planification-calendar.component';
import { UpdatelivrableComponent } from './front/livrable/updatelivrable/updatelivrable.component';
import { ViewlivrableComponent } from './front/livrable/viewlivrable/viewlivrable.component';
import { ProjetComponent } from './front/projet/projet.component';
import { CreateprojetComponent } from './front/projet/createprojet/createprojet.component';
import { UpdateprojetComponent } from './front/projet/updateprojet/updateprojet.component';
import { ViewprojetComponent } from './front/projet/viewprojet/viewprojet.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SingInComponent,
    NavbarComponent,
    FooterComponent,
    ErrorModalComponent,
    SuccessModalComponent,
    VerificationModalComponent,
    ProductsClientComponent,
    LivrableComponent,
    CreatelivrableComponent,
    PlanificationCalendarComponent,
    UpdatelivrableComponent,
    ViewlivrableComponent,
    ProjetComponent,
    CreateprojetComponent,
    UpdateprojetComponent,
    ViewprojetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FullCalendarModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
