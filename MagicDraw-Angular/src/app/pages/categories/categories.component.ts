import { Component, type OnInit } from "@angular/core"
import type { MatDialog } from "@angular/material/dialog"
import type { MatSnackBar } from "@angular/material/snack-bar"
import type { CategoryService } from "../../services/category.service"
import type { Category } from "../../models/category.model"
import { AddCategoryDialogComponent } from "../../components/add-category-dialog/add-category-dialog.component"
import { ConfirmDialogComponent } from "../../components/confirm-dialog/confirm-dialog.component"

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = []
  filteredCategories: Category[] = []
  loading = true
  searchTerm = ""

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories(): void {
    this.loading = true
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories
        this.applyFilter()
        this.loading = false
      },
      (error) => {
        console.error("Error loading categories:", error)
        this.loading = false
      },
    )
  }

  applyFilter(): void {
    this.filteredCategories = this.categories.filter(
      (category) =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(this.searchTerm.toLowerCase()),
    )
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: "400px",
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addCategory(result)
      }
    })
  }

  addCategory(categoryData: { name: string; description: string }): void {
    // In a real app, this would call the API to create a new category
    const newCategory: Category = {
      id: Date.now().toString(), // Temporary ID
      name: categoryData.name,
      description: categoryData.description,
      count: 0,
      percentage: 0,
      color: "bg-gray",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.categoryService.createCategory(newCategory).subscribe(
      (category) => {
        this.categories.push(category)
        this.applyFilter()
        this.snackBar.open("Category added successfully", "Close", { duration: 3000 })
      },
      (error) => {
        console.error("Error adding category:", error)
        this.snackBar.open("Error adding category", "Close", { duration: 3000 })
      },
    )
  }

  confirmDeleteCategory(category: Category): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Category",
        message: `Are you sure you want to delete the category "${category.name}"? This action cannot be undone.`,
        confirmButtonText: "Delete",
        confirmButtonColor: "warn",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCategory(category.id)
      }
    })
  }

  deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.categories = this.categories.filter((category) => category.id !== id)
        this.applyFilter()
        this.snackBar.open("Category deleted successfully", "Close", { duration: 3000 })
      },
      (error) => {
        console.error("Error deleting category:", error)
        this.snackBar.open("Error deleting category", "Close", { duration: 3000 })
      },
    )
  }
}
