import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CategoryProduct } from '../../model/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  category: CategoryProduct = { nom: '' };
  @Output() formSubmitted = new EventEmitter();
  @Input() categoryToUpdate: CategoryProduct | null = null;
  mode = 'add';
  ngOnInit(): void {
    if (this.categoryToUpdate != null) {
      this.mode = 'edit';
      this.category.nom = this.categoryToUpdate.nom;
    }
  }
  constructor(private categoryService: CategoryService) {}
  saveCategory(): void {
    if (this.mode === 'add') {
      this.categoryService.create(this.category).subscribe(() => {
        this.category = { nom: '' };
        alert('Catégorie ajoutée avec succès');
        this.formSubmitted.emit();
      });
    } else {
      this.categoryService
        .update(this.categoryToUpdate?.id || 0, this.category)
        .subscribe(() => {
          alert('Catégorie modifiée avec succès');
          this.formSubmitted.emit();
        });
    }
  }
}
