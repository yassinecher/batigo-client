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
import { AddFournisseurComponent } from './components/add-fournisseur/add-fournisseur.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { UpdateFournisseurComponent } from './update-fournisseur/update-fournisseur.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { ProductsComponent } from './components/products/products.component';
import { FormPrductComponent } from './components/products/form-prduct/form-prduct.component';
import { ProductStatsComponent } from './components/product-stats/product-stats.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductsClientComponent } from './front/products-client/products-client.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SingInComponent,
    NavbarComponent,
    FooterComponent,
    ErrorModalComponent,
    SuccessModalComponent,
    AddFournisseurComponent,
    FournisseurListComponent,
    UpdateFournisseurComponent,
    CategoriesComponent,
    AddCategoryComponent,
    ProductsComponent,
    FormPrductComponent,
    ProductStatsComponent,
    ProductsClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // Other imports here
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
