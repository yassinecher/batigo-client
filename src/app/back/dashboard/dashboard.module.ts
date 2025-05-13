import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule, RouterLink } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardComponent } from "./dashboard.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { FeedsComponent } from "./dashboard-components/feeds/feeds.component";
import { TopSellingComponent } from "./dashboard-components/top-selling/top-selling.component";
import { TopCardsComponent } from "./dashboard-components/top-cards/top-cards.component";
import { BlogCardsComponent } from "./dashboard-components/blog-cards/blog-cards.component";
 
import { ExpenseComponent } from "../expense/index/index.component";
import { IncomeComponent } from "../income/index/index.component";
 
import { NewIncomeComponent } from "../income/new-income/new-income.component";
 
import { ShowIncomeComponent } from "../income/show-income/show-income.component";
import { EditIncomeComponent } from "../income/edit-income/edit-income.component";
import { EditExpenseComponent } from "../expense/edit-expense/edit-expense.component";
import { ShowExpenseComponent } from "../expense/show-expense/show-expense.component";
import { NewExpenseComponent } from "../expense/new-expense/new-expense.component";
import { EditProjetComponent } from "../projet/edit-projet/edit-projet.component";
import { NewProjetComponent } from "../projet/new-projet/new-projet.component";
import { ShowProjetComponent } from "../projet/show-projet/show-projet.component";
import { ProjetComponent } from "../projet/projet.component";
import { ProjectStatisticsComponent } from './dashboard-components/project-statistics/project-statistics.component';
import { PerformanceComponent } from './dashboard-components/performance/performance.component';
import { BrowserModule } from "@angular/platform-browser";
import { ProjetAdminComponent } from "./projet-admin/projet-admin.component";
import { SalesSummaryComponent } from "./dashboard-components/sales-summary/sales-summary.component";
import ApexCharts from "apexcharts";
import { LivrableStatisticsComponent } from "./livrable-statistics/livrable-statistics.component";
import { LivrableAdminComponent } from "./livrable-admin/livrable-admin.component";
 
 
 

 

 
 

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
    path: "projets",
    component: ProjetComponent, 
     
  },
  {
    path: "projets/new",
    component: NewProjetComponent, 
     
  },
  {
    path: "projets/edit/:id",
    component: EditProjetComponent, 
     
  },
  {
    path: "projets/:id",
    component: ShowProjetComponent, 
     
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
    path: "expense/new",
    component: NewExpenseComponent , 
    data: {
      title: "expenses",
      urls: [{ title: "expenses", url: "/expense/new" }, { title: "expenses" }],
    },
  },
  {
    path: "expense/:id",
    component:  ShowExpenseComponent, 
     
  },
  {
    path: "expense/edit/:id",
    component:  EditExpenseComponent, 
     
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
  {
    path: "income/:id",
    component: ShowIncomeComponent, 
     
  },
  {
    path: "income/edit/:id",
    component: EditIncomeComponent, 
     
  },
];

@NgModule({
  imports: [
  
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    RouterModule.forChild(routes),
    NgApexchartsModule,
    NgxPaginationModule,
    RouterLink,
     

  ],
  declarations: [
    DashboardComponent,
    
    FeedsComponent,
    TopSellingComponent,
    TopCardsComponent,
    BlogCardsComponent,
    ProjectStatisticsComponent,
    PerformanceComponent,
    SalesSummaryComponent,
    ProjetAdminComponent,
    LivrableStatisticsComponent,
    LivrableAdminComponent,
    
     

 

     
    
  ],
})
export class DashboardModule {}
