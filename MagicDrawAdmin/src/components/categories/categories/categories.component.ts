import { Component, OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { MatDialog } from "@angular/material/dialog"
import { MatSnackBar } from "@angular/material/snack-bar"
import { CategoryDialogComponent } from "./category-dialog/category-dialog.component"
import { ConfirmDialogComponent } from "../../../shareds/confirm-dialog/confirm-dialog/confirm-dialog.component"
import { MatIcon } from "@angular/material/icon"
import { MatCard } from "@angular/material/card"
import { MatCardContent } from "@angular/material/card"
import { MatFormField } from "@angular/material/form-field"
import { MatLabel } from "@angular/material/form-field"

export interface Category {
  id: number
  name: string
  description: string
  drawingsCount: number
  createdAt: string
  iconName: string
  color: string
}

@Component({
  selector: "app-categories",
  imports: [MatIcon, MatCard, MatCardContent, MatPaginator, MatSort, MatFormField, MatLabel],
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ["id", "icon", "name", "description", "drawingsCount", "createdAt", "actions"]
  dataSource = new MatTableDataSource<Category>()

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    // Mock data
    const categories: Category[] = [
      {
        id: 1,
        name: "Animals",
        description: "Drawings of animals and pets",
        drawingsCount: 245,
        createdAt: "2023-01-10",
        iconName: "pets",
        color: "#f44336",
      },
      {
        id: 2,
        name: "Nature",
        description: "Landscapes, plants, and natural scenes",
        drawingsCount: 189,
        createdAt: "2023-01-15",
        iconName: "eco",
        color: "#4caf50",
      },
      {
        id: 3,
        name: "Fantasy",
        description: "Magical and fantasy themed drawings",
        drawingsCount: 156,
        createdAt: "2023-02-01",
        iconName: "auto_awesome",
        color: "#9c27b0",
      },
      {
        id: 4,
        name: "Space",
        description: "Space, planets, and astronomy",
        drawingsCount: 98,
        createdAt: "2023-02-10",
        iconName: "rocket",
        color: "#2196f3",
      },
      {
        id: 5,
        name: "Vehicles",
        description: "Cars, planes, and other vehicles",
        drawingsCount: 87,
        createdAt: "2023-02-20",
        iconName: "directions_car",
        color: "#ff9800",
      },
      {
        id: 6,
        name: "People",
        description: "Portraits and people",
        drawingsCount: 132,
        createdAt: "2023-03-05",
        iconName: "people",
        color: "#795548",
      },
      {
        id: 7,
        name: "Buildings",
        description: "Architecture and buildings",
        drawingsCount: 76,
        createdAt: "2023-03-15",
        iconName: "apartment",
        color: "#607d8b",
      },
      {
        id: 8,
        name: "Food",
        description: "Food and drinks",
        drawingsCount: 64,
        createdAt: "2023-03-25",
        iconName: "restaurant",
        color: "#e91e63",
      },
    ]

    this.dataSource.data = categories
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  addCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: "500px",
      data: { title: "Add Category", category: {} },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // In a real app, you would call a service to add the category
        const newCategory: Category = {
          id: this.dataSource.data.length + 1,
          name: result.name,
          description: result.description,
          drawingsCount: 0,
          createdAt: new Date().toISOString().split("T")[0],
          iconName: result.iconName,
          color: result.color,
        }

        this.dataSource.data = [...this.dataSource.data, newCategory]
        this.snackBar.open("Category added successfully", "Close", { duration: 3000 })
      }
    })
  }

  editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: "500px",
      data: { title: "Edit Category", category: { ...category } },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // In a real app, you would call a service to update the category
        const updatedCategories = this.dataSource.data.map((c) =>
          c.id === category.id
            ? {
                ...c,
                name: result.name,
                description: result.description,
                iconName: result.iconName,
                color: result.color,
              }
            : c,
        )

        this.dataSource.data = updatedCategories
        this.snackBar.open("Category updated successfully", "Close", { duration: 3000 })
      }
    })
  }

  deleteCategory(category: Category) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Category",
        message: `Are you sure you want to delete "${category.name}"? This will affect ${category.drawingsCount} drawings.`,
        confirmText: "Delete",
        cancelText: "Cancel",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // In a real app, you would call a service to delete the category
        this.dataSource.data = this.dataSource.data.filter((c) => c.id !== category.id)
        this.snackBar.open("Category deleted successfully", "Close", { duration: 3000 })
      }
    })
  }
}
