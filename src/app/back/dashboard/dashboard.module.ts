import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule, RouterLink } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardComponent } from "./dashboard.component";
import { SalesSummaryComponent } from "./dashboard-components/sales-summary/sales-summary.component";
import { FeedsComponent } from "./dashboard-components/feeds/feeds.component";
import { TopSellingComponent } from "./dashboard-components/top-selling/top-selling.component";
import { TopCardsComponent } from "./dashboard-components/top-cards/top-cards.component";
import { BlogCardsComponent } from "./dashboard-components/blog-cards/blog-cards.component";
import { AccountComponent } from "../account/account.component";
import { ExpenseComponent } from "../expense/index/index.component";
import { IncomeComponent } from "../income/index/index.component";
import { NewAccountComponent } from "../account/new-account/new-account.component";
import { NewIncomeComponent } from "../income/new-income/new-income.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Dashboard",
      urls: [{ title: "Dashboard", url: "/dashboard" }, { title: "Dashboard" }],
    },
    component: DashboardComponent,
  },
  {
    path: "accounts",
    component: AccountComponent, 
     
  },
  {
    path: "accounts/new",
    component: NewAccountComponent, 
     
  },
  {
    path: "expense",
    component: ExpenseComponent, 
    data: {
      title: "Expenses",
      urls: [{ title: "Expenses", url: "/expense" }, { title: "Expenses" }],
    },
  },
  {
    path: "income",
    component: IncomeComponent, 
    data: {
      title: "incomes",
      urls: [{ title: "incomes", url: "/income" }, { title: "incomes" }],
    },
  },
  {
    path: "income/new",
    component: NewIncomeComponent, 
    data: {
      title: "incomes",
      urls: [{ title: "incomes", url: "/income/new" }, { title: "incomes" }],
    },
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
    RouterLink
  ],
  declarations: [
    DashboardComponent,
    SalesSummaryComponent,
    FeedsComponent,
    TopSellingComponent,
    TopCardsComponent,
    BlogCardsComponent
  ],
})
export class DashboardModule {}
