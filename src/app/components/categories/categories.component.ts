import { Component } from '@angular/core';
import { CategoryProduct } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: CategoryProduct[] = [];
  openForm: boolean = false;
  categoryToUpdate: CategoryProduct | null = null;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((data) => (this.categories = data));
  }

  deleteCategory(id: number): void {
    this.categoryService.delete(id).subscribe(() => {
      this.categories = this.categories.filter((cat) => cat.id !== id);
    });
  }
  openAddCategory() {
    this.openForm = true;
  }
  onFormSubmitted() {
    this.openForm = false;
    this.loadCategories();
  }
  selectCategoryToUpdate(category: CategoryProduct): void {
    this.categoryToUpdate = category;
    this.openForm = true;
  }
}
