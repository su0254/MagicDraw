import { Component } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/categoryService/category.service';
import { Category } from '../../Models/Category';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: Category[] | undefined;
  category: string = '';
  isEditing = false; // מצב עריכה

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });
    this.categoryService.getAllCategories();
  }

  addCategory(newCategory:HTMLInputElement): void {
    console.log("newCategory", newCategory.value);
    if (newCategory.value) {
      this.categoryService.addCategory({ id: '', categoryName: newCategory.value });
      newCategory.value = ''; // לנקות את השדה לאחר ההוספה
    }
  }

  deleteCategory(categoryId: string): void {
    console.log("categoryId", categoryId);
    
    this.categoryService.deleteCategory(categoryId);
  }

  // updateCategory(categoryId: string, updatedName: string): void {
  //   this.categoryService.updateCategory(categoryId, {id: categoryId,  categoryName: updatedName });
  // }

  // toggleEdit() {
  //   this.isEditing = !this.isEditing; // מתחלף בין מצב עריכה למצב קריאה
  // }
}
