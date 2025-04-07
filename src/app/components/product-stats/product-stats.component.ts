import { Component, ViewChild, OnInit } from '@angular/core';
import { ProductStatsService } from '../../services/product-stats.service';
import { CategoryService } from '../../services/category.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ChartComponent,
} from 'ng-apexcharts';
import { Produit } from '../../models/produit';
import { CategoryProduct } from '../../models/category';
import { ProduitService } from '../../services/produit.service';

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  title: any;
  colors: any;
};

@Component({
  selector: 'app-product-stats',
  templateUrl: './product-stats.component.html',
  styleUrls: ['./product-stats.component.scss'],
})
export class ProductStatsComponent implements OnInit {
  @ViewChild('productByCategoryChart') productByCategoryChart!: ChartComponent;

  public chartOptions!: Partial<ChartOptions>;

  totalProducts: number = 0;
  totalQuantity: number = 0;
  mostPopularCategory: string = '';
  categories: CategoryProduct[] = [];
  products: Produit[] = [];
  productCountByCategory: { [key: string]: number } = {};
  isLoadingCategoryChart: boolean = true;

  // Chart Data
  totalProductsChartData: ApexAxisChartSeries = [
    { data: [this.totalProducts] },
  ];
  totalQuantityChartData: ApexAxisChartSeries = [
    { data: [this.totalQuantity] },
  ];

  // Chart Options
  totalProductsChartOptions: Partial<ChartOptions> = {
    series: this.totalProductsChartData,
    chart: { type: 'bar', height: 300 },
    title: { text: 'Total Number of Products' },
    xaxis: { categories: ['Products'] },
    colors: ['#008FFB'],
  };

  totalQuantityChartOptions: Partial<ChartOptions> = {
    series: this.totalQuantityChartData,
    chart: { type: 'bar', height: 300 },
    title: { text: 'Total Quantity of Products' },
    xaxis: { categories: ['Quantity'] },
    colors: ['#00E396'],
  };

  productByCategoryChartOptions: Partial<ChartOptions> = {
    series: [],
    chart: { type: 'bar', height: 350 },
    title: { text: 'Products by Category' },
    xaxis: { categories: [] },
    colors: ['#775DD0'],
  };

  constructor(
    private statsService: ProductStatsService,
    private categoryService: CategoryService,
    private productService: ProduitService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadStats();
    this.loadProducts();
  }

  loadStats(): void {
    this.statsService.getTotalNumberOfProducts().subscribe((data) => {
      this.totalProducts = data;
      this.totalProductsChartData = [{ data: [this.totalProducts] }];
      this.updateChartData();
    });

    this.statsService.getTotalQuantityOfAllProducts().subscribe((data) => {
      this.totalQuantity = data;
      this.totalQuantityChartData = [{ data: [this.totalQuantity] }];
      this.updateChartData();
    });

    this.statsService.getMostPopularCategory().subscribe((data: any) => {
      this.mostPopularCategory = data.category;
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.countProductsByCategory();
    });
  }

  countProductsByCategory(): void {
    this.productCountByCategory = {};
    this.isLoadingCategoryChart = true;

    for (const product of this.products) {
      const categoryName = product.categorie?.nom;
      if (categoryName) {
        this.productCountByCategory[categoryName] =
          (this.productCountByCategory[categoryName] || 0) + 1;
      }
    }

    this.updateChartData();
    this.isLoadingCategoryChart = false;
  }

  updateChartData(): void {
    this.totalProductsChartOptions = {
      ...this.totalProductsChartOptions,
      series: this.totalProductsChartData,
    };
    this.totalQuantityChartOptions = {
      ...this.totalQuantityChartOptions,
      series: this.totalQuantityChartData,
    };

    const categories = Object.keys(this.productCountByCategory);
    const counts = Object.values(this.productCountByCategory);

    this.productByCategoryChartOptions = {
      ...this.productByCategoryChartOptions,
      series: [{ name: 'Products', data: counts }],
      xaxis: { categories },
    };

    // Force chart update when reference is available
    setTimeout(() => {
      if (this.productByCategoryChart) {
        this.productByCategoryChart.updateOptions(
          this.productByCategoryChartOptions,
          true,
          true
        );
      }
    });
  }
}
